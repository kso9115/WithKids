// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import treeclose from '../../images/treeclose.png';
import treeopen from '../../images/treeopen.png';
import './programTree.css'

const treeData = [
    {
        prg_big_cls: '교육',
        count: '2',
        contents: [
            {
                prg_mid_cls: '특기적성',
                count: '3',
                contents: [
                    {
                        prg_sub_cls: '독서활동',
                        count: '4',
                        contents: [
                            {
                                prg_nm: '독서활동',
                                count: '5',
                                prg_str: '20240101',
                                prg_end: '20241231'
                            }
                        ]
                    },
                    {
                        prg_sub_cls: '악기활동',
                        count: '6',
                        contents: [
                            {
                                prg_nm: '악기활동',
                                count: '7',
                                prg_str: '20240101',
                                prg_end: '20241231'
                            }
                        ]
                    },
                    {
                        prg_sub_cls: '합창활동',
                        count: '8',
                        contents: [
                            {
                                prg_nm: '합창활동',
                                count: '9',
                                prg_str: '20240101',
                                prg_end: '20241231'
                            }
                        ]
                    }
                ]
            },
            {
                prg_mid_cls: '학습',
                count: '10',
                contents: [
                    {
                        prg_sub_cls: '영어지도프로그램',
                        count: '11',
                        contents: [
                            {
                                prg_nm: '영어지도프로그램',
                                count: '12',
                                prg_str: '20240101',
                                prg_end: '20241231'
                            }
                        ],
                    }
                ],
            }
        ]
    },
    {
        prg_big_cls: '돌봄',
        count: '13',
        contents: [
            {
                prg_mid_cls: '돌돔서비스',
                count: '14',
                contents: [
                    {
                        prg_sub_cls: '돌돔프로그램',
                        count: '15',
                        contents: [
                            {
                                prg_nm: '평일반',
                                count: '16',
                                prg_str: '20240101',
                                prg_end: '20241231'
                            }
                        ],
                    }
                ],
            }
        ]
    },
    {
        prg_big_cls: '이용',
        count: '17',
        contents: [
            {
                prg_mid_cls: '시설이용',
                count: '18',
                contents: [
                    {
                        prg_sub_cls: '이용_서비스',
                        count: '19',
                        contents: [
                            {
                                prg_nm: '모전지역아동센터',
                                count: '20',
                                prg_str: '20240101',
                                prg_end: '20241231'
                            }
                        ]
                    }
                ]
            }
        ],
    },
];

function ProgramTree({ name }) {

    function requestTree(e) {
        console.log(e.target.innerText.substring(0, e.target.innerText.indexOf('(')));
    }

    let treeMake = treeData.map((e) => {
        return (
            <TreeItem key={e.count} nodeId={e.count} label={e.prg_big_cls} >
                {e.contents.map((e2) => {
                    return (
                        <TreeItem key={e2.count} nodeId={e2.count} label={e2.prg_mid_cls} >
                            {e2.contents.map((e3) => {
                                return (
                                    <TreeItem key={e3.count} nodeId={e3.count} label={e3.prg_sub_cls} >
                                        {e3.contents.map((e4) => {
                                            return (
                                                <>
                                                    <TreeItem key={e4.count} nodeId={e4.count} onClick={requestTree} value={e4.prg_nm}
                                                        label={e4.prg_nm + '(' + e4.prg_str + '~' + e4.prg_end + ')'} ></TreeItem>
                                                </>
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

    return (
        <>
            <div style={{
                marginBottom: '5px'
            }}>
                {name}
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

export default ProgramTree;