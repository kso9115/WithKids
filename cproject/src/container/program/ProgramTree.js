// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import treeclose from '../../images/treeclose.png';
import treeopen from '../../images/treeopen.png';
import React from "react";
import './programTree.css'

function ProgramTree({ name, setData, treeData, prgData }) {
    
    let count = 1;
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
                                                <TreeItem key={e4.count} nodeId={e4.count} onClick={() => {
                                                    let data = prgData[prgData.findIndex((item) => item.prg_id === e4.prg_id)];
                                                    data = {
                                                        ...data,
                                                        f_typ: !data.f_typ ?
                                                            new Set() : Array.isArray(data.f_typ) ?
                                                                data.cls_inc : data.f_typ.indexOf(' ') > 0 ?
                                                                    new Set(data.f_typ.split(' ')) : new Set([data.f_typ]),
                                                        cls_inc: !data.cls_inc ?
                                                            new Set() : Array.isArray(data.cls_inc) ?
                                                                data.cls_inc : data.cls_inc.indexOf(' ') > 0 ?
                                                                    new Set(data.cls_inc.split(' ')) : new Set([data.cls_inc]),
                                                    };
                                                    setData(data)
                                                }}
                                                    label={e4.prg_nm} ></TreeItem>
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

export default React.memo(ProgramTree);
// export default ProgramTree;