import './survey.css';


function Survey() {


	  

	return (
		<div  className="surveybox" style={{textAlign:'center', background:"var(--admin)"}}>
			<h2>설문조사 페이지</h2>
			<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc9cUTDM9g3RqnzCx9NlrbQUt1G--JxYx-lJQye0TCRFGzZSw/viewform?embedded=true" width="640" height="2049" frameborder="0" marginheight="0" marginwidth="0">로드 중…</iframe>
		</div>
	);		

}

export default Survey;