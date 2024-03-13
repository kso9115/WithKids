// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import treeclose from '../../images/treeclose.png';
import treeopen from '../../images/treeopen.png';
import './programTree.css'

function ProgramTree({name}) {

    function TreeOpenner() {
        let array = ['1'];
        for (let i = 2; i < 20; i++) {
            array.push(i + "");
        }
        return array;
    }

    console.log(TreeOpenner());

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

                        <TreeItem nodeId="2" label="교육" >
                            <div className='TreeBorder'>
                                <TreeItem nodeId="3" label="특기적성" >
                                    <div className='TreeBorder'>
                                        <TreeItem nodeId="4" label="독서활동" >
                                            <div className='TreeBorder'>
                                                <TreeItem nodeId="5" label={`독서활동${' 빈공간'}`} />
                                            </div>
                                        </TreeItem>
                                        <TreeItem nodeId="6" label="악기활동" >
                                            <div className='TreeBorder'>
                                                <TreeItem nodeId="7" label={`악기활동${' 빈공간'}`} />
                                            </div>

                                        </TreeItem>
                                        <TreeItem nodeId="8" label="합창활동" >
                                            <div className='TreeBorder'>
                                                <TreeItem nodeId="9" label={`합창활동${' 빈공간'}`} />
                                            </div>
                                        </TreeItem>
                                    </div>
                                </TreeItem>

                                <TreeItem nodeId="10" label="학습" >
                                    <TreeItem nodeId="11" label="영어지도프로그램" >
                                        <TreeItem nodeId="12" label={`영어지도프로그램${' 빈공간'}`} />
                                    </TreeItem>
                                </TreeItem>
                            </div>
                        </TreeItem>
                        <TreeItem nodeId="13" label="돌봄" >
                            <div className='TreeBorder'>
                                <TreeItem nodeId="14" label="돌봄서비스" >
                                    <TreeItem nodeId="15" label="돌봄 프로그램" >
                                        <TreeItem nodeId="16" label={`평일반${' 빈공간'}`} />
                                    </TreeItem>
                                </TreeItem>
                            </div>
                        </TreeItem>
                        <TreeItem nodeId="17" label="이용" >
                            <TreeItem nodeId="18" label="시설이용" >
                                <TreeItem nodeId="19" label="이용_서비스" >
                                    <TreeItem nodeId="20" label={`모전지억아동센터_이용${' 빈공간'}`} />
                                </TreeItem>
                            </TreeItem>
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </div>
        </>

    );
}

export default ProgramTree;