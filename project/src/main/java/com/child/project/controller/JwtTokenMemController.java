package com.child.project.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.child.project.entity.Attandance;
import com.child.project.entity.Education;
import com.child.project.entity.MealMngm;
import com.child.project.entity.MemAdmission;
import com.child.project.entity.MemLeaving;
import com.child.project.entity.Member;
import com.child.project.service.AttandanceService;
import com.child.project.service.MealMngmService;
import com.child.project.service.MemAdmissionService;
import com.child.project.service.MemLeavingService;
import com.child.project.service.MemberService;
import com.child.project.service.NoticeService;
import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/jwtMem")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class JwtTokenMemController {

    PasswordEncoder passwordEncoder;
    NoticeService Ntcservice;
    ProgramService prgService;
    AttandanceService attService;
    MemberService memService;
    MemAdmissionService admService;
    MemLeavingService lvngService;
    MealMngmService mealService;

    @PostMapping("/mem/attChange")
    public String attSave(@RequestBody Attandance entity) {
        String message = "";

        // log.info(entity);

        try {
            attService.attSave(entity);
            message = "추가 성공";
        } catch (Exception e) {
            log.info(e.toString());
            message = "추가 실패";
        }

        return message;
    }

    

    @PostMapping("/mem/memDelete")
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
    @PostMapping("/mem/memInesert")
    public String memInsert(@RequestBody Member entity, HttpServletRequest request) throws IOException {
        String message = "";
//        String realPath = request.getSession().getServletContext().getRealPath("/");
//        log.info("** realPath => " + realPath);
//
//        if (!realPath.contains("tomcat9")) {
//            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/memberImg/"
//                    + entity.getMemSerial() + "/";
//        } else {
//            realPath += "resources/memberImg/"
//                    + entity.getMemSerial() + "/";
//        }
//        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
//        File file = new File(realPath);
//        if (!file.exists()) {
//            // 저장 폴더가 존재하지 않는경우 만들어줌
//            file.mkdir();
//        }
//
//        log.info(realPath);
//
//        // // ** File Copy 하기 (IO Stream)
//        file = new File(realPath + "memberImg.png"); // uploadImages 폴더에 화일존재
//        if (!file.isFile()) { // 존재하지않는 경우
//            String basicImagePath;
//            if (!realPath.contains("apache-tomcat"))
//                basicImagePath = "C:/Mtest/childProject/project/src/main/webapp/resources/images/memberImg.png";
//            else
//                basicImagePath = "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/images/memberImg.png";
//            FileInputStream fi = new FileInputStream(new File(basicImagePath));
//            // => uploadImages 읽어 파일 입력바이트스트림 생성
//            FileOutputStream fo = new FileOutputStream(file);
//            // => 목적지 파일(realPath+"basicman4.png") 출력바이트스트림 생성
//            FileCopyUtils.copy(fi, fo);
//        }

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

    // Education 엔티티에 접근
    @PostMapping("/mem/memEduInesert")
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

    // 비밀번호 초기화 : resetPW
    @GetMapping("/mem/resetPw")
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

    @PostMapping("/mem/eduDelete")
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

    @PostMapping("/mem/changePswrd")
    public String changePswrd(@RequestBody Member entity) {
        String message = "";
        String password = entity.getMemLoginPW();
        log.info(" member updataPassword " + entity.getMemLoginPW());
        try {
            Member userMember = memService.selectOne(entity.getMemSerial());
            log.info(" member entity " + entity);
            if (userMember != null && passwordEncoder.matches(password, userMember.getMemLoginPW())) {
                entity.setMemLoginPW(passwordEncoder.encode(entity.getMemEndF()));
                memService.resetPw(entity.getMemLoginPW(), entity.getMemSerial());
                // service.updataPassword(entity.getStaffId(), entity.getStaffPsw());
                return message = "성공";
            } else {
                return message = "입력하신 기존 비밀번호가 올바르지 않습니다."; // 관리자 id,pw 오류
            }
        } catch (Exception e) {
            return message = "비밀번호 변경에 실패했습니다. 관리자에게 문의 바랍니다."; // 아이디 없음
            // return entity;
        }

    } // resetPswrd

    @PostMapping("/adm/insert")
    public void insert(@RequestBody MemAdmission entity) {

        log.info("컴포넌트는 들어오냐? " + entity);

        if (admService.save(entity) != null) {
            try {
                log.info(" MemAdmission insert 성공 => " + admService.save(entity));
            } catch (Exception e) {

                log.info(" MemAdmission insert 실패(에러남) => " + e.toString());
            }
        } else {
            log.info("MemAdmission 추가되지 않았습니다. 입력하신 정보를 확인해주세요");
        }

    }

    @PostMapping("/adm/delete")
    public void delete(@RequestBody MemAdmission entity) {

        log.info("Delete Controller까지는 옴?");

        if (admService.delete(entity) != null) {
            try {

                log.info(" MemAdmission delete 성공 => " + entity.getMemSerial());

            } catch (Exception e) {

                log.info(" MemAdmission delete 실패(에러남) => " + e.toString());
            }
        } else {
            log.info("MemAdmission 삭제 불가능. 다시 한번 확인 부탁드립니다, ");
        }

    }

    @PostMapping("/lvn/insert")
    public MemLeaving insert(@RequestBody MemLeaving entity) {
        MemLeaving lvngOne = lvngService.save(entity);
        log.info("컴포넌트는 들어오냐? " + entity);

        if (lvngOne != null) {
            try {
                log.info(" MemLeaving insert 성공 => " + lvngService.save(entity));
            } catch (Exception e) {
                log.info(" MemLeaving insert 실패(에러남) => " + e.toString());
            }
        }

        return lvngOne;
    }

    @PostMapping("/lvn/update")
    public MemLeaving update(@RequestBody MemLeaving entity) {
        MemLeaving lvngOne = lvngService.save(entity);
        log.info("Update Controller까지는 옴?");

        if (lvngOne != null) {
            try {
                log.info(" MemLeaving Update 성공 => " + lvngService.save(entity));
            } catch (Exception e) {
                log.info(" MemLeaving Update 실패(에러남) => " + e.toString());
            }
        }

        return lvngOne;
    }

    @PostMapping("/lvn/delete")
    public MemLeaving delete(@RequestBody MemLeaving entity) {
        MemLeaving lvngOne = lvngService.delete(entity);

        // log.info("Delete Controller까지는 옴?");

        log.info(" MemLeaving delete 성공 => " + lvngOne);

        return lvngOne;
    }

    @PostMapping("/meal/MInsert")
    public MealMngm MInsert(@RequestBody MealMngm entity) {
        // log.info("MInsert 요청까지 옴 111=> " + entity);

        MealMngm mealListO = mealService.mnInsert(entity);

        return mealListO;

    }
}
