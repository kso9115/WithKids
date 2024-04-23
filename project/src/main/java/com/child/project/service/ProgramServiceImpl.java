package com.child.project.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.net.ssl.HttpsURLConnection;
import javax.transaction.Transactional;

// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.child.project.domain.ProgramDetailsDTO;
// import com.child.project.domain.ProgramDTO;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramApplication;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;
import com.child.project.repository.ProgramApplicationRepository;
import com.child.project.repository.ProgramDetailsRepository;
import com.child.project.repository.ProgramRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService {

	private final ProgramRepository repository;
	// private final ProgramDTO DTO;
	private final ProgramDetailsRepository prgdrepository;

	private final ProgramApplicationRepository prgarepository;

	@Override
	public List<Program> selectList() {
		return repository.findAll();
	}

	@Override
	public Program selectOne(String prgId) {
		return repository.selectOne(prgId);
	}

	@Override
	public ProgramDetailsDTO selectJoinOne(ProgramDetailsId programDetailsId) {
		return prgdrepository.selectJoinOne(programDetailsId.getRec(),
				programDetailsId.getPrgId(), programDetailsId.getPrgDnm());
	}

	@Override
	public List<ProgramDetails> selectSlide() {
		LocalDate now = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String formatedNow = now.format(formatter);

		return prgdrepository.selectSlide(formatedNow);
	}

	@Override
	public List<Program> findSearch(Program entity) {
		return repository.findSearch(entity.getPrgStr(), entity.getPrgEnd(),
				entity.getPrgNm(), entity.getPrgMngr(), entity.getPrgCls());
	}

	@Override
	public List<ProgramDetails> findPlnSearch(ProgramDetails entity) {
		log.info(entity.getPrgDate().split("~")[0]);
		log.info(entity.getPrgDate().split("~")[1]);
		return prgdrepository.findSearch(entity.getPrgDate().split("~")[0], entity.getPrgDate().split("~")[1],
				entity.getPrgNm(), entity.getTitle(), entity.getPrgMngr());
	}

	@Override
	public Integer detailsCnt(String prgId, String prgDnm) {
		return prgdrepository.detailsCnt(prgId, prgDnm);
	}

	@Override
	public Integer plnCnt(String prgId, String title) {
		return prgdrepository.plnCnt(prgId, title);
	}

	@Override
	public Program save(Program entity) {
		log.info("** register : entity => " + entity);
		repository.save(entity); // 처리후 entity 를 return

		return entity;
	}

	@Override
	public ProgramDetails dtSave(ProgramDetails entity) {
		log.info("** register : entity => " + entity);
		prgdrepository.save(entity); // 처리후 entity 를 return

		return entity;
	}

	@Override
	public Integer saveCat(String prgBigCls, String prgMidCls, String prgSubCls) {
		return repository.saveCat(prgBigCls, prgMidCls, prgSubCls);
	}

	@Override
	public void deleteById(ProgramId entityId) {
		repository.deleteById(entityId);
	}

	@Override
	public void deleteDtById(ProgramDetailsId entityId) {
		prgdrepository.deleteById(entityId);
	}

	@Override
	public List<ProgramDetails> selectDetails(String prgId, String rec) {
		return prgdrepository.selectDetails(prgId, rec);
	}

	@Override
	public ProgramDetails selectDetailsOne(ProgramDetailsId entity) {
		Optional<ProgramDetails> result = prgdrepository.findById(entity);
		if (result.isPresent())
			return result.get();
		else
			return null;
		// return prgdrepository.findById(entity);
	}

	@Override
	public List<ProgramDetails> selectAllPlan() {

		return prgdrepository.selectAllPlan();
	}

	@Override
	public List<ProgramDetails> selectSearchPlanUs(String word) {
		return prgdrepository.selectSearchPlanUs(word);
	}

	@Override
	public List<ProgramApplication> selectAllApl(String prgId) {
		return prgarepository.selectAllApl(prgId);
	}

	@Override
	public ProgramApplication aplSave(ProgramApplication entity) {
		return prgarepository.save(entity);
	}

	@Override
	public List<ProgramApplication> selectMemApl(String memSerial) {
		return prgarepository.selectMemApl(memSerial);
	}

	@Override
	public Integer MemAplCk(String memSerial, String prgId) {
		return prgarepository.MemAplCk(memSerial, prgId);
	}

	@Override
	public void prgCnclt(ProgramApplication entity) {
		prgarepository.prgCnclt(entity.getMemSerial(), entity.getPrgId(), 1);
	}

	@Override
	public String refundRequest(String access_token, String imp_uid, String reason) throws Exception {
		JsonObject json = new JsonObject();
		json.addProperty("imp_uid", imp_uid);
		json.addProperty("reason", "프로젝트 취소");
		log.info("json.toString() = " + json.toString());
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://api.iamport.kr/payments/cancel"))
				.header("Content-Type", "application/json")
				.header("Authorization", access_token)
				.method("POST", HttpRequest.BodyPublishers.ofString(json.toString()))
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request,
				HttpResponse.BodyHandlers.ofString());
		log.info(" 환불 결과 " + response.body());

		JsonParser JsonParser = new JsonParser();
		JsonObject jsonResponse = JsonParser.parse(response.body()).getAsJsonObject();
		String resultCode = jsonResponse.get("code").getAsString();
		// String resultMessage = jsonResponse.get("message").getAsString();

		log.info("결과 코드 = " + resultCode);
		// log.info("결과 메시지 = " + resultMessage);
		return resultCode;
	}

	@Override
	public String getToken(String apiKey, String secretKey) throws IOException {
		URL url = new URL("https://api.iamport.kr/users/getToken");
		HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();

		// 요청 방식을 POST로 설정
		conn.setRequestMethod("POST");

		// 요청의 Content-Type과 Accept 헤더 설정
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("Accept", "application/json");

		// 해당 연결을 출력 스트림(요청)으로 사용
		conn.setDoOutput(true);

		// JSON 객체에 해당 API가 필요로하는 데이터 추가.
		JsonObject json = new JsonObject();
		json.addProperty("imp_key", apiKey);
		json.addProperty("imp_secret", secretKey);

		// 출력 스트림으로 해당 conn에 요청
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		bw.write(json.toString()); // json 객체를 문자열 형태로 HTTP 요청 본문에 추가
		bw.flush(); // BufferedWriter 비우기
		bw.close(); // BufferedWriter 종료

		// 입력 스트림으로 conn 요청에 대한 응답 반환
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		Gson gson = new Gson(); // 응답 데이터를 자바 객체로 변환
		String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
		String accessToken = gson.fromJson(response, Map.class).get("access_token").toString();
		br.close(); // BufferedReader 종료

		conn.disconnect(); // 연결 종료

		log.info("Iamport 엑세스 토큰 발급 성공 : {}", accessToken);
		return accessToken;
	}
	// @Override
	// public List<ProgramDetails> selectDetails() {
	// return prgdrepository.findAll();
	// }
}
