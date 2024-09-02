import React, { useState } from 'react';
import { Layout, Input, Button, Table } from 'antd';
import 'antd/dist/reset.css';
import { DictionaryEntry } from '../types';
import { DICTIONARY_LIST } from '../const';

const { Content, Footer } = Layout;
const { TextArea } = Input;

const Dicionary: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [results, setResults] = useState<DictionaryEntry[]>([]);

    const handleTranslate = () => {
        const allEntries: DictionaryEntry[] = DICTIONARY_LIST.flatMap((dict) =>
            dict.list.map(([han, viet]) => ({
                han,
                viet,
                dictionaryName: dict.name // Thêm tên từ điển
            }))
        );

        // Tách từ Hán ngữ dựa trên dấu phẩy
        const filteredResults = allEntries.filter((entry) => {
            const hanSplit = entry.han.split(','); // Tách các từ Hán ngữ

            // Kiểm tra nếu từ tìm kiếm có mặt trong tiếng Việt hoặc bất kỳ từ Hán ngữ nào
            return (
                entry.viet.includes(text) ||
                hanSplit.some((hanItem) => hanItem.includes(text))
            );
        });

        setResults(filteredResults);
    };

    const columns = [
        {
            title: 'Từ tìm kiếm',
            dataIndex: 'han',
            key: 'han'
        },
        {
            title: 'Nghĩa',
            dataIndex: 'viet',
            key: 'viet'
        },
        {
            title: 'Từ điển',
            dataIndex: 'dictionaryName', // Cột mới để hiển thị tên từ điển
            key: 'dictionaryName'
        }
    ];
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            handleTranslate();
        }
    };

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <div className="site-layout-content">
                    <TextArea
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Nhập từ Hán ngữ hoặc tiếng Việt ở đây"
                        onKeyDown={handleKeyPress}
                    />
                    <Button type="primary" onClick={handleTranslate} style={{ marginTop: '10px' }}>
                        Tìm kiếm
                    </Button>
                    <Table
                        dataSource={results}
                        columns={columns}
                        rowKey="han"
                        style={{ marginTop: '20px' }}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Hán Ngữ Translator ©2024 Created by Tuong</Footer>
        </Layout>
    );
};

export default Dicionary;
