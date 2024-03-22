export const prg_mng = {
    name: '프로그램 정보 관리', // 서치 박스 위에 표시될 이름
    action: 'prgmng', // form 태그로 전달할 요청명
    method: 'get', // form 태그로 전달할 요청 방식
    content: [ // 서치 박스 안에 생성할 요소 객체를 모아둔 배열
        {
            name: '프로그램 기간', // input/select 앞에 표현될 내용
            state: ['prgStr', 'prgEnd'], // 테이블과 연결될 컬럼명
            type: 'date', //input 타입이나 select
            esntl: true, // 필수 요소 표현 유무
            default: ["", ""] // 표현될 default 값
        },
        {
            name: '프로그램명',
            state: 'prgNm',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '담당자',
            state: 'prgMngr',
            type: 'text',
            esntl: false,
            default: ''
        }
        ,
        {
            name: '프로그램 구분',
            state: 'prgCls',
            type: 'select',
            esntl: false,
            default: [{ name: '내부형프로그램', value: '내부형프로그램', check: false }, { name: '신청형프로그램', value: '신청형프로그램', check: false }],
        }
    ]
}

export const admLvng_mng = {
    name: '입소(이용) / 퇴소(종결) 관리 ', // 서치 박스 위에 표시될 이름
    action: 'admLvng', // form 태그로 전달할 요청명
    method: 'get', // form 태그로 전달할 요청 방식
    content: [ // 서치 박스 안에 생성할 요소 객체를 모아둔 배열
        {
            name: '조회 기간', // input/select 앞에 표현될 내용
            state: ['adsrc_str', 'adsrc_end'], // 테이블과 연결될 컬럼명
            type: 'date', //input 타입이나 select
            esntl: true, // 필수 요소 표현 유무
            default: ['2023-01-01', '2023-12-31'] // 표현될 default 값
        },
        {
            name: '대상자 성명',
            state: 'adsrc_nm',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '담당자 성명',
            state: 'adsrc_nmgr',
            type: 'text',
            esntl: false,
            default: ''
        }
        ,
        {
            name: '입소/이용퇴소 상태',
            state: 'admLvngStatus',
            type: 'select',
            esntl: false,
            default: [{ name: '이용', value: '이용' }, { name: '종결', value: '종결' }]
        },
        {
            name: '입소/이용결정 상태',
            state: 'admStatus',
            type: 'select',
            esntl: false,
            default: [{ name: '대기', value: '대기' }, { name: '결정', value: '결정' }, { name: '취소', value: '취소' }]
        }
    ]
}

export const mem_mng = {
    name: '대상자 기본정보', // 서치 박스 위에 표시될 이름
    action: 'memmng', // form 태그로 전달할 요청명
    method: 'get', // form 태그로 전달할 요청 방식
    content: [ // 서치 박스 안에 생성할 요소 객체를 모아둔 배열
        {
            name: '재원 기간', // input/select 앞에 표현될 내용
            state: ['mem_str', 'mem_end'], // 테이블과 연결될 컬럼명
            type: 'date', //input 타입이나 select
            esntl: true, // 필수 요소 표현 유무
            default: ['2023-01-01', '2023-12-31'] // 표현될 default 값
        },
        {
            name: '대상자 성명',
            state: 'mem_name',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '대상자 성별',
            state: 'mem_sex',
            type: 'select',
            esntl: false,
            default: [{ name: '여성', value: '여성' }, { name: '남성', value: '남성' }]
        },
        {
            name: '담당자 성명',
            state: 'mem_responsible_person',
            type: 'text',
            esntl: false,
            default: ''
        }
        ,
        {
            name: '입소 상태',
            state: 'mem_status',
            type: 'select',
            esntl: false,
            default: [{ name: '전체', value: '전체' }, { name: '이용', value: '이용' }]
        }
    ]
}

export const stf_mng = {
    name: '직원관리 및 직원정보',
    action: 'stfmng',
    method: 'get',
    content: [
        {
            name: '직위',
            state: 'staff_pst',
            type: 'select',
            esntl: false,
            default: [{ name: '시설장', value: '시설장' }, { name: '생활복지사', value: '생활복지사' }]
        },
        {
            name: '이름',
            state: 'staff_nm',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '아이디',
            state: 'staff_id',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '전화번호',
            state: 'staff_phnn',
            type: 'text',
            esntl: false,
            default: ''
        }
    ]
}

export const att_mng = {
    name: '출석관리', 
    action: 'attmng',
    method: 'get', 
    content: [ // 서치 박스 안에 생성할 요소 객체를 모아둔 배열
        {
            name: '재원 기간', // input/select 앞에 표현될 내용
            state: ['att_str', 'mem_end'], // 테이블과 연결될 컬럼명
            type: 'date', //input 타입이나 select
            esntl: true, // 필수 요소 표현 유무
            default: ['2023-01-01', '2023-12-31'] // 표현될 default 값
        },
        {
            name: '대상자 성명',
            state: 'mem_name',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '대상자 전화번호',
            state: 'mem_phone',
            type: 'text',
            esntl: false,
            default: ''
        },
    ]
}