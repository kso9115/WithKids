export const prg_mng = {
    name: '프로그램 정보 관리', // 서치 박스 위에 표시될 이름
    action: 'prgmng', // form 태그로 전달할 요청명
    method: 'get', // form 태그로 전달할 요청 방식
    content: [ // 서치 박스 안에 생성할 요소 객체를 모아둔 배열
        {
            name: '프로그램 기간', // input/select 앞에 표현될 내용
            state: ['prg_str', 'prg_end'], // 테이블과 연결될 컬럼명
            type: 'date', //input 타입이나 select
            esntl: true, // 필수 요소 표현 유무
            default: ['2024-01-01', '2024-12-31'] // 표현될 default 값
        },
        {
            name: '프로그램명',
            state: 'prg_nm',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '담당자',
            state: 'prg_mngr',
            type: 'text',
            esntl: false,
            default: ''
        }
        ,
        {
            name: '프로그램 그룹',
            state: 'programGroup',
            type: 'select',
            esntl: false,
            default: [{ name: '음악', value: '음악' }, { name: '공부', value: '공부' }, { name: '독서', value: '독서' }]
        }
    ]
}

export const  admLvng_mng= {
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
            default: [{ name: '대기', value: '대기' }, { name: '결정', value: '결정' },{ name: '취소', value: '취소' } ]
        }
    ]
}

export const  mem_mng= {
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
            state: 'mem_nm',
            type: 'text',
            esntl: false,
            default: ''
        },
        {
            name: '대상자 성별',
            state: 'mem_gn',
            type: 'select',
            esntl: false,
            default: [{ name: '여성', value: '여성' }, { name: '남성', value: '남성' }]
        },
        {
            name: '담당자 성명',
            state: 'mem_nmgr',
            type: 'text',
            esntl: false,
            default: ''
        }
        ,
        {
            name: '입소 상태',
            state: 'memStatus',
            type: 'select',
            esntl: false,
            default: [{ name: '전체', value: '전체' }, { name: '이용', value: '이용' }]
        }
    ]
}