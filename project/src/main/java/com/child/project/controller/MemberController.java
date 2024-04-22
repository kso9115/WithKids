package com.child.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.child.project.domain.UserDTO;
// import com.child.project.domain.MemberDTO;
import com.child.project.entity.Education;
import com.child.project.entity.Member;
import com.child.project.jwtToken.TokenProvider;
import com.child.project.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Log4j2
@RestController
@RequestMapping(value = "/api/mem")
@AllArgsConstructor
public class MemberController {

    MemberService memService;
    // MemberDTO memberdto;
    PasswordEncoder passwordEncoder;
    TokenProvider tokenProvider;

    // 파라미터로 데이터를 전달하는게 아니니까 get매핑 사용해도 무방
    @GetMapping("/memList")
    public List<Member> memList() {
        // log.info("memList확인" + list); // 넘어오는거 확인함
        log.info("memList 들어오는지 확인");
        // return list;
        return memService.selectList();
    }

    // Post방식 하나의 Edu 데이터 전달 : Education타입의 바디에 담아서 전달
    @PostMapping("/memSelectOneEdu")
    public Education selectEduData(@RequestBody Education entity) {
        log.info("memSelectOneEdu 들어오는지 확인");
        
        // String memSerial = entity.getMemSerial(); // memSerial 파라미터 값 저장
        try {
            Education selectOneEdu = memService.selectEduData(entity.getMemSerial());
            return selectOneEdu;
        } catch (Exception e) {
            log.info(e.toString());
            return null;
        }
    }

    // 안씀;
    @GetMapping("/memSelectOne")
    public Member selectOne(@RequestParam("memSerial") String memSerial) {
        Member selectOneMembers = memService.selectOne(memSerial);
        return selectOneMembers;
    }

    @PostMapping("/memDelete")
    public String deleteMemByMemserial(@RequestParam("memSerial") String memSerial) {

        String message = "";

        try {
            memService.deleteMemByMemserial(memSerial);
            message = "삭제 성공";
        } catch (Exception e) {
            log.info("member delete Exception" + e.toString());
            message = "삭제 실패";
        }

        return message;
    }

    // Member 엔티티, memSerial 가져올 entity추가
    @PostMapping("/memInesert")
    public String memInsert(@RequestBody Member entity, HttpServletRequest request) throws IOException {
        String message = "";
        String realPath = request.getSession().getServletContext().getRealPath("/");
        log.info("** realPath => " + realPath);

        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/memberImg/"
                    + entity.getMemSerial() + "/";
        } else {
            realPath += "resources/memberImg/"
                    + entity.getMemSerial() + "/";
        }
        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
        File file = new File(realPath);
        if (!file.exists()) {
            // 저장 폴더가 존재하지 않는경우 만들어줌
            file.mkdir();
        }

        log.info(realPath);

        // // ** File Copy 하기 (IO Stream)
        file = new File(realPath + "memberImg.png"); // uploadImages 폴더에 화일존재
        if (!file.isFile()) { // 존재하지않는 경우
            String basicImagePath;
            if (!realPath.contains("apache-tomcat"))
                basicImagePath = "C:/Mtest/childProject/project/src/main/webapp/resources/images/memberImg.png";
            else
                basicImagePath = "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/images/memberImg.png";
            FileInputStream fi = new FileInputStream(new File(basicImagePath));
            // => uploadImages 읽어 파일 입력바이트스트림 생성
            FileOutputStream fo = new FileOutputStream(file);
            // => 목적지 파일(realPath+"basicman4.png") 출력바이트스트림 생성
            FileCopyUtils.copy(fi, fo);
        }

        log.info("entity 값을 확인해보자" + entity); // 잘와유
        // save하려는 값이 없으면 실행x

        // 현재 시간을 가져오기
        LocalDateTime currentTime = LocalDateTime.now();

        // 날짜 포맷을 지정 "yyyy-MM-dd" 형식
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDateTime = currentTime.format(formatter);

        try {
            // 초기 기본 비밀번호 설정을 위한 값 부여
            entity.setMemLoginPW("$2a$10$AlGFCUpTsqFJ0MFETCbnyOTnKA.qgpIhr0fe1SeTLlF3PCiYSZ9tG");
            entity.setMemRegisterDate(formattedDateTime);
            memService.save(entity);

            message = "아동 추가 입력 성공";
        } catch (Exception e) {
            log.info("member insert 실패 => " + e.toString());
            message = "아동 추가 입력 실패";
        }

        return message;
    }

    // 이미지 파일 업로드
    @PostMapping("/imgUpload")
    public String imgUpload(@RequestParam("memImg") MultipartFile memImg,
            @RequestParam("memSerial") String memSerial, HttpServletRequest request)
            throws IOException {

        log.info("이미지업로드 들어오니");
        // // 1.1) 현제 웹어플리케이션의 실질적인 실행위치 확인
        String realPath = request.getSession().getServletContext().getRealPath("/");
        log.info("** realPath => " + realPath);
        // // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
        // C:\Mtest\childProject\project\src\main\webapp\resources\memberImg
        // if (!realPath.contains("apache-tomcat"))
        // realPath =
        // "C:/Mtest/childProject/project/src/main/webapp/resources/memberImg/"
        // + memSerial + "/"; // 개발중.
        // else
        // // 경로 아직없음
        // realPath =
        // "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/memberImg/"
        // + memSerial + "/";

        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/memberImg/"
                    + memSerial + "/";
        } else {
            realPath += "resources/memberImg/" + memSerial + "/";
        }
        // // 1.4) 저장경로 완성
        String file1 = "";
        // List<MultipartFile> uploadfilef = entity.getPrgFilef();
        if (memImg != null && !memImg.isEmpty()) {
            File delFile = new File(realPath + memImg);
            if (delFile.isFile())
                delFile.delete(); // file 존재시 삭제
            file1 = realPath + "memberImg.png"; // 저장경로 완성
            // file1 = realPath + prgImg.getOriginalFilename(); // 저장경로 완성
            memImg.transferTo(new File(file1));
        }

        return "파일 저장 완료";
    }

    // 업로드 된 이미지 사용자 페이지에서 띄워주기
    @GetMapping("/memOneImg")
    public ResponseEntity<?> memOneImg(@RequestParam String memSerial, HttpServletRequest request) throws Exception {

        String realPath = request.getSession().getServletContext().getRealPath("/");

        // if (!realPath.contains("apache-tomcat")) {
        // realPath =
        // "C:/Mtest/childProject/project/src/main/webapp/resources/memberImg/";
        // } else {
        // realPath =
        // "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/memberImg/";
        // }

        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/memberImg/";
        } else {
            realPath += "resources/memberImg/";
        }
        log.info(memSerial);
        Resource resource = new FileSystemResource(realPath + memSerial + "/memberImg.png");

        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    // Education 엔티티에 접근
    @PostMapping("/memEduInesert")
    public String memEduInsert(@RequestBody Education entity) {
        String message = "";
        log.info("%%%%%%%%%%%%%%%%%%%%%%%%%%데이터 전달되는 부분 확인");
        log.info("entity 값을 확인해보자" + entity);
        // log.info("넘어오나?" + entity.getMemSerial());
        // log.info(entity);
        try {

            memService.save(entity);
            // entity.setMemRegisterDate("2023-03-26");
            // memService.save(entity);

            // 파라미터 값 저장
            // log.info("member insert 성공 => " + memService.save(memEntity)); // 넘어오는거 확인완

            message = "아동 추가 입력 성공";
        } catch (Exception e) {
            log.info("member insert 실패 => " + e.toString());
            message = "아동 추가 입력 실패";
        }

        return message;
    }

    @GetMapping("/memSearch")
    public List<Member> memSearch(Member entity) {
        // log.info("entity=>" + entity);
        List<Member> list = memService.searchList(entity);
        log.info("오냐?");
        return list;
    }

    @PostMapping("/eduDelete")
    public String deleteEduByMemserial(@RequestParam("memSerial") String memSerial) {

        String message = "";

        try {
            memService.deleteEduByMemserial(memSerial);
            message = "삭제 성공";
        } catch (Exception e) {
            log.info("member delete Exception" + e.toString());
            message = "삭제 실패";
        }

        return message;
    }

    // findSerialList
    @GetMapping("/admissionList")
    public List<Member> selectAdmissionList() {
        log.info("센터 이용중인 리스트 출력하는 레포지토리 소환");
        List<Member> list = memService.selectAdmissionList();
        // log.info(list);
        return list;
    }

    // 비밀번호 초기화 : resetPW
    @GetMapping("/resetPw")
    // public String resetPw(@RequestParam Member entity) {
    public String resetPw(Member entity) {
        String message = "";

        log.info(entity);
        log.info("?????????????????????????????????????????");
        // 초기 비밀번호 12345!
        entity.setMemLoginPW(passwordEncoder.encode("12345!"));
        try {
            memService.resetPw(entity.getMemLoginPW(), entity.getMemSerial());
            log.info("비밀번호 업데이트 성공");
            message = "초기화에 성공했습니다.";
        } catch (Exception e) {
            log.info(e.toString());
            message = "초기화에 실패했습니다.";
        }

        return message;
    }

    // 로그인 요청 ======================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member entity) {
        // log.info("여기까지 요청 왔다.");

        Member userMember = memService.selectOne(entity.getMemSerial());
        log.info(userMember.getMemStatus());

        if ("이용".equals(userMember.getMemStatus())) {

            // String password = entity.getMemLoginPW();
            // log.info("userMember의 pw => " +userMember.getMemLoginPW());
            // log.info("받아온 값 pw => " +entity.getMemLoginPW());

            if (userMember != null && passwordEncoder.matches(entity.getMemLoginPW(), userMember.getMemLoginPW())) {
                // log.info("로그인 요청 들어옴 => " + entity.getMemSerial()+ " : "
                // +entity.getMemLoginPW());
                // token
                final String token = tokenProvider.create(userMember);

                // 세션에 저장(이름이랑, id 정도를 저장)
                // return ResponseEntity.status(HttpStatus.OK).body(userMember.getMemName());
                // Map<String, String> responseData = new HashMap<>();
                // responseData.put("memName", userMember.getMemName());
                // responseData.put("memSerial", userMember.getMemSerial());

                final UserDTO userDTO = UserDTO.builder()
                        .token(token)
                        .id(userMember.getMemSerial())
                        .username(userMember.getMemName())
                        .staffChlCr(0)
                        .staffCmnMng(0)
                        .staffCntMng(0)
                        .build();

                return ResponseEntity.status(HttpStatus.OK).body(userDTO);
            } else {
                log.info("페스워드까지 통과 못함");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("user Login faild"); // 비밀번호가 다른 경우
            }
        } else {
            log.info("이용중 아님");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user Status faild"); // 이용 중이 아닌 경우
        }

    }

    @PostMapping("/memEduAll")
    public Member memEduAll(@RequestBody Member entity) {
        try {
            entity = memService.selectAllMember(entity.getMemSerial());
            // log.info("뭐가 나오긴 하냐 ?????" + entity);
            return entity;
        } catch (Exception e) {
            log.info("member delete Exception" + e.toString());
            return null;
        }

    }
}
