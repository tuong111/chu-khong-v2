import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';
import * as HTMLDocx from 'html-docx-js-typescript';
import { Popover, Button, Table } from 'antd';
import { DICTIONARY_LIST } from '../const';

// Hàm chuyển đổi Buffer thành Blob
const bufferToBlob = (buffer: Buffer, mimeType: string): Blob => {
    return new Blob([buffer], { type: mimeType });
};

const DocumentEditor: React.FC = () => {
    const [editorHtml, setEditorHtml] = useState<string>('');
    const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
    const [popoverPosition, setPopoverPosition] = useState<{ left: number; top: number } | null>(null);
    const [translationResults, setTranslationResults] = useState<{ dictionary: string; han: string; viet: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const quillRef = useRef<ReactQuill>(null);

    const dictionaries = DICTIONARY_LIST;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    mammoth.convertToHtml({ arrayBuffer: e.target.result as ArrayBuffer })
                        .then(result => {
                            setEditorHtml(''); // Xóa nội dung trước khi render file mới
                            setEditorHtml(result.value); // Render nội dung mới
                        })
                        .catch(err => {
                            console.error('Error converting file:', err);
                        });
                }
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const handleExport = () => {
        if (quillRef.current) {
            const html = quillRef.current.getEditor().root.innerHTML;
            HTMLDocx.asBlob(html).then((blobOrBuffer) => {
                const blob = bufferToBlob(blobOrBuffer as Buffer, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                saveAs(blob, 'edited-document.docx');
            }).catch(err => {
                console.error('Error exporting file:', err);
            });
        }
    };

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim()) {
            const selectedText = selection.toString().trim();
            const results = dictionaries.flatMap(({ name, list }) => {
                return list
                    .filter(([han]) => han.includes(selectedText))
                    .map(([han, viet]) => ({ dictionary: name, han, viet }));
            });
            setTranslationResults(results);
            setPopoverVisible(true);

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // Sử dụng window.scrollX và window.scrollY để điều chỉnh vị trí chính xác
            setPopoverPosition({ 
                left: rect.left + window.scrollX, 
                top: rect.top + rect.height + window.scrollY 
            });
        }
    };

    useEffect(() => {
        const editor = quillRef.current?.getEditor();
        if (editor) {
            editor.root.addEventListener('mouseup', handleSelection);
        }

        return () => {
            const editor = quillRef.current?.getEditor();
            if (editor) {
                editor.root.removeEventListener('mouseup', handleSelection);
            }
        };
    }, [quillRef.current]);

    const columns = [
        { title: 'Dictionary', dataIndex: 'dictionary', key: 'dictionary' },
        { title: 'Từ tìm kiếm', dataIndex: 'han', key: 'han' },
        { title: 'Dịch', dataIndex: 'viet', key: 'viet' },
    ];

    const handleOpenChange = (newOpen: boolean) => {
        setPopoverVisible(newOpen);
    };

    return (
        <div>
            <h1>Document Editor</h1>
            <input
                type="file"
                accept=".docx"
                onChange={handleFileChange}
                ref={fileInputRef}
            />
            <ReactQuill
                ref={quillRef}
                value={editorHtml}
                onChange={setEditorHtml}
                placeholder="Edit your document here..."
            />
            <Button onClick={handleExport} type="primary">Export to Word</Button>
            {popoverVisible && popoverPosition && (
                <Popover
                    trigger="click"
                    content={<Table dataSource={translationResults} columns={columns} pagination={false} />}
                    open={popoverVisible}
                    onOpenChange={handleOpenChange}
                    placement="topLeft"
                    style={{ position: 'absolute', left: popoverPosition.left, top: popoverPosition.top }}
                >
                    <span style={{ position: 'absolute', left: popoverPosition.left, top: popoverPosition.top }} />
                </Popover>
            )}
        </div>
    );
};

export default DocumentEditor;
