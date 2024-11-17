import React from 'react';
import '../styles/SearchHeader.css';

const SearchHeader: React.FC = () => {
  return (
    <table style={{width: '100%'}}>
        <tbody>
            <tr style={{borderTop: '2px solid #03318C'}}>
                <td id="category">브랜드별</td>
                <td id="brand">
                    <a>비비고</a>
                    <a>사조오양</a>
                    <a>동원</a>
                    <a>노브랜드</a>
                </td>
            </tr>
            <tr>
                <td id="category">총 수량</td>
                <td id="brand">
                    <a>~10개</a>
                    <a>~20개</a>
                    <a>~30개</a>
                    <a>30개 이상</a>
                </td>
            </tr>
            <tr style={{borderBottom: '1px solid #03318C'}}>
                <td id="category">가격대별</td>
                <td id="brand">
                    <input type="text" placeholder="최저가" />
                    &nbsp;&nbsp;~&nbsp;&nbsp;
                    <input type="text" placeholder="최고가" />
                </td>
            </tr>
        </tbody>
    </table>
  );
};

export default SearchHeader;
