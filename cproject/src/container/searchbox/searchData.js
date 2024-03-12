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