// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import treeclose from '../../assets/images/treeclose.png';
import treeopen from '../../assets/images/treeopen.png';
import React from "react";
import './programTree.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { apiCall } from '../../server/apiService';
import * as XLSX from 'xlsx';

function ProgramTree({ name, setData, treeUpdate }) {
    const loginInfo = JSON.parse(sessionStorage.getItem("staffname"));
    const [prgData, setPrgData] = useState([]); //프로그램 테이블 전체 보관
    useEffect(() => {
        if (treeUpdate !== true && treeUpdate !== false) {
            // prgSearch();
            apiCall('/prg/prgSearch', 'GET', treeUpdate)
                .then((response) => {
                    setPrgData(response.data);
                    setData([]);
                }).catch((error) => {
                    console.log(error);
                })
        } else {
            apiCall('/prg/prgList', 'GET')
                .then((response) => {
                    setPrgData(response.data);
                }).catch((error) => {
                    console.log(error);
                })
        }
    }, [treeUpdate]);

    let treeCount = 2;
    let check = '';
    let check2 = '';
    let check3 = '';
    const treeData = [];
    if (prgData.length > 0) {
        for (let i = 0; i < prgData.length; i++) {
            if (prgData[i].prgBigCls !== check) {
                check = prgData[i].prgBigCls;
                treeData.push({
                    prgBigCls: prgData[i].prgBigCls,
                    count: `${treeCount++}`,
                    contents: []
                });
                for (let j = 0; j < prgData.length; j++) {
                    if (prgData[j].prgBigCls === check && prgData[j].prgMidCls !== check2) {
                        check2 = prgData[j].prgMidCls;
                        treeData.at(-1).contents.push({
                            prgMidCls: prgData[j].prgMidCls,
                            count: `${treeCount++}`,
                            contents: []
                        });
                        for (let k = 0; k < prgData.length; k++) {
                            if (prgData[k].prgBigCls === check && prgData[k].prgMidCls === check2 && prgData[k].prgSubCls !== check3) {
                                check3 = prgData[k].prgSubCls;
                                treeData.at(-1).contents.at(-1).contents.push({
                                    prgSubCls: prgData[k].prgSubCls,
                                    count: `${treeCount++}`,
                                    contents: []
                                })
                                for (let l = 0; l < prgData.length; l++) {
                                    if (prgData[l].prgBigCls === check && prgData[l].prgMidCls === check2 && prgData[l].prgSubCls === check3) {
                                        treeData.at(-1).contents.at(-1).contents.at(-1).contents.push({
                                            prgId: prgData[l].prgId,
                                            prgNm: prgData[l].prgNm,
                                            count: `${treeCount++}`,
                                        })
                                    }
                                }
                            }
                        }
                        check3 = '';
                    }
                }
                check2 = '';
            }
        }
        check = '';
    }

    function prgOne(prgId) {
        apiCall('/prg/prgOne', 'POST', { prgId })
            .then((response) => {
                response.data = {
                    ...response.data,
                    ffTyp: !response.data.ffTyp ?
                        new Set() : Array.isArray(response.data.ffTyp) ?
                            response.data.cls_inc : response.data.ffTyp.indexOf(' ') > 0 ?
                                new Set(response.data.ffTyp.split(' ')) : new Set([response.data.ffTyp]),
                    clsInc: !response.data.clsInc ?
                        new Set() : Array.isArray(response.data.clsInc) ?
                            response.data.cls_inc : response.data.clsInc.indexOf(' ') > 0 ?
                                new Set(response.data.clsInc.split(' ')) : new Set([response.data.clsInc]),
                };
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    let treeMake = treeData.map((e) => {
        return (
            <TreeItem key={e.count} nodeId={e.count} label={e.prgBigCls} >
                {e.contents.map((e2) => {
                    return (
                        <TreeItem key={e2.count} nodeId={e2.count} label={e2.prgMidCls} >
                            {e2.contents.map((e3) => {
                                return (
                                    <TreeItem key={e3.count} nodeId={e3.count} label={e3.prgSubCls} >
                                        {e3.contents.map((e4) => {
                                            return (
                                                <TreeItem key={e4.count} nodeId={e4.count} onClick={() => {
                                                    prgOne(e4.prgId);
                                                    // let data = prgData[prgData.findIndex((item) => item.prgId === e4.prgId)];
                                                    // data = {
                                                    //     ...data,
                                                    //     ffTyp: !data.ffTyp ?
                                                    //         new Set() : Array.isArray(data.ffTyp) ?
                                                    //             data.cls_inc : data.ffTyp.indexOf(' ') > 0 ?
                                                    //                 new Set(data.ffTyp.split(' ')) : new Set([data.ffTyp]),
                                                    //     clsInc: !data.clsInc ?
                                                    //         new Set() : Array.isArray(data.clsInc) ?
                                                    //             data.cls_inc : data.clsInc.indexOf(' ') > 0 ?
                                                    //                 new Set(data.clsInc.split(' ')) : new Set([data.clsInc]),
                                                    // };
                                                    // setData(data);
                                                }}
                                                    label={e4.prgNm} >
                                                </TreeItem>
                                            )
                                        })}
                                    </TreeItem>
                                )
                            })}
                        </TreeItem>
                    )
                })}
            </TreeItem>
        )
    })

    function TreeOpenner() {
        let array = ['1'];
        for (let i = 2; i < 20; i++) {
            array.push(i + "");
        }
        return array;
    }

    function xssDownload() {
        apiCall('/user/xssDownload', 'GET', {name: 'program'}, loginInfo.data.token)
            .then((response) => {
                const excelData = response.data;

                // 데이터를 JSON 형태로 받아옴
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);
                XLSX.utils.book_append_sheet(wb, ws, "program 목록");

                // 파일로 저장
                XLSX.writeFile(wb, "program.xlsx");
            }).catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <div className='treeName' style={{
                marginBottom: '5px'
            }}>
                {name}<button type='button' onClick={xssDownload}>엑셀다운로드</button>
            </div>
            <div className='treeBox'>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<img src={treeopen} alt='treeclose' width='14px' height='14px' />}
                    defaultExpandIcon={<img src={treeclose} alt='treeclose' width='14px' height='14px' />}
                    // defaultExpanded='All'
                    defaultExpanded={TreeOpenner()}
                    // defaultCollapseIcon={<ExpandMoreIcon />}
                    // defaultExpandIcon={<ChevronRightIcon />}
                    className='treeFont'
                >

                    <TreeItem nodeId="1" label="사업정보">
                        {treeMake}
                    </TreeItem>
                </TreeView>
            </div>
        </>

    );
}

export default React.memo(ProgramTree);