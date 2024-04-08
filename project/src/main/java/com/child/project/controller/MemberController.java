package com.child.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.domain.UserDTO;
import com.child.project.entity.Attandance;
// import com.child.project.domain.MemberDTO;
import com.child.project.entity.Education;
import com.child.project.entity.Member;
import com.child.project.jwtToken.TokenProvider;
import com.child.project.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
        log.info("memList확인");
        List<Member> list = memService.selectList();

        // log.info("memList확인" + list); // 넘어오는거 확인함

        return list;
    }

    // @GetMapping("/memEduList")
    // public List<Education> selectEduList() {
    // log.info("memEduList 확인");
    // List<Education> list = memService.selectEduList();

    // // log.info("memEduList 확인" + list);

    // return list;
    // }

    // Get방식 하나의 Edu 데이터 전달
    // @GetMapping("/memSelectOneEdu")
    // public Education selectEduData(@RequestParam("memSerial") String memSerial) {
    // log.info("11111111111111111111111");
    // Education selectOneEdu = memService.selectEduData(memSerial);
    // return selectOneEdu;
    // }

    // Post방식 하나의 Edu 데이터 전달 : Education타입의 바디에 담아서 전달
    @PostMapping("/memSelectOneEdu")
    public Education selectEduData(@RequestBody Education entity) {
        // log.info("&&&&&&&&&&&&&&&&&&&&&&&&&&&&오냐?");

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
    public String memInsert(@RequestBody Member entity) {
        String message = "";
        log.info("memInesert !!! 데이터 전달되는 부분 확인");
        log.info("entity 값을 확인해보자" + entity); //잘와유
        // log.info("넘어오나?" + entity.getMemSerial());

        // save하려는 값이 없으면 실행x
        try {
            // if (memService.save(entity) != null) {

            // }

            // 초기 기본 비밀번호 설정을 위한 값 부여
            entity.setMemLoginPW("12345!");
            entity.setMemRegisterDate("2023-03-26");
            memService.save(entity);

            // 파라미터 값 저장
            // log.info("member insert 성공 => " + memService.save(memEntity)); // 넘어오는거 확인완

            message = "아동 추가 입력 성공";
        } catch (Exception e) {
            log.info("member insert 실패 => " + e.toString());
            message = "아동 추가 입력 실패";
        }

        return message;
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
        String message ="";

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
        // log.info(userMember);

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
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("user Login faild");
        }

    }

}
