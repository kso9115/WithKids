package com.child.project.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.child.project.entity.Attandance;
import com.child.project.entity.Education;
import com.child.project.entity.Member;
import com.child.project.entity.Notice;
import com.child.project.entity.Program;
import com.child.project.entity.ProgramDetails;
import com.child.project.entity.ProgramDetailsId;
import com.child.project.entity.ProgramId;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffAtn;
import com.child.project.service.AttandanceService;
import com.child.project.service.MemberService;
import com.child.project.service.NoticeService;
import com.child.project.service.ProgramService;
import com.child.project.service.StaffService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(value = "/api/jwtPrg")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class JwtTokenPrgController {

    PasswordEncoder passwordEncoder;
    NoticeService Ntcservice;
    ProgramService prgService;
    AttandanceService attService;
    MemberService memService;
    StaffService stfService;

    @PostMapping("/notice/noticeSave")
    public String noticeSave(@RequestBody Notice entity, HttpServletRequest request) throws IOException {
        String message = "";

        String realPath = request.getSession().getServletContext().getRealPath("/");
        log.info("** realPath => " + realPath);

        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/noticeFile/"
                    + entity.getSeq() + "/";
        } else {
            realPath += "resources/noticeFile/" + entity.getSeq() + "/";
        }

        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
        File file = new File(realPath);
        if (!file.exists()) {
            // 저장 폴더가 존재하지 않는경우 만들어줌
            file.mkdir();
        }

        try {
            log.info(" notice save 성공 => " + Ntcservice.save(entity));
            message = "성공 했습니다.";
        } catch (Exception e) {
            log.info(" notice save Exception => " + e.toString());
            message = "실패 했습니다. 관리자에게 문의하세요.";
        }
        return message;
    }// noticeSave

    // @RequestBody
    @PostMapping("/prg/prgSave")
    public String prgInsert(@RequestBody Program entity, HttpServletRequest request) throws IOException {
        String message = "";
        String realPath = request.getSession().getServletContext().getRealPath("/");
        String prgImgPath = "";
        log.info("** realPath => " + realPath);

        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/programImg/"
                    + entity.getPrgId() + "/";
        } else {
            realPath += "resources/programImg/" + entity.getPrgId() + "/";
        }
        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
        File file = new File(realPath);
        if (!file.exists()) {
            // 저장 폴더가 존재하지 않는경우 만들어줌
            file.mkdir();
        }

        // // ** File Copy 하기 (IO Stream)
        file = new File(realPath + "programImg.png"); // uploadImages 폴더에 화일존재
        if (!file.isFile()) { // 존재하지않는 경우
            String basicImagePath;
            if (!realPath.contains("apache-tomcat"))
                basicImagePath = "C:/Mtest/childProject/project/src/main/webapp/resources/images/programImg.png";
            else
                basicImagePath = "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/images/programImg.png";
            FileInputStream fi = new FileInputStream(new File(basicImagePath));
            // => uploadImages 읽어 파일 입력바이트스트림 생성
            FileOutputStream fo = new FileOutputStream(file);
            // => 목적지 파일(realPath+"basicman4.png") 출력바이트스트림 생성
            FileCopyUtils.copy(fi, fo);
        }

        entity.setPrgId(entity.getPrgBigCls() + entity.getPrgMidCls() + entity.getPrgSubCls());
        if (prgService.saveCat(entity.getPrgBigCls(), entity.getPrgMidCls(), entity.getPrgSubCls()) == 0
                && "prgInsert".equals(entity.getType())) {
            try {
                log.info(" program insert 성공 => " + prgService.save(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" program insert Exception => " + e.toString());
                message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (prgService.saveCat(entity.getPrgBigCls(), entity.getPrgMidCls(), entity.getPrgSubCls()) == 1
                && "prgUpdate".equals(entity.getType())) {
            try {
                log.info(" program Update 성공 => " + prgService.save(entity));
                message = "저장에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" program Update Exception => " + e.toString());
                message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if ("prgInsert".equals(entity.getType())) {
            message = "신규생성에 실패 했습니다. 같은 프로그램이 있는지 확인하세요.";
        } else if ("prgUpdate".equals(entity.getType())) {
            message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
        } else {
            message = "요청에 실패했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }

    // @PostMapping("/prgDtInsert")
    @PostMapping("/prg/prgDtSave")
    public String prgDtSave(
            @RequestBody ProgramDetails entity, HttpServletRequest request)
            throws IOException {
        String message = "";

        // // 1.1) 현제 웹어플리케이션의 실질적인 실행위치 확인
        String realPath = request.getSession().getServletContext().getRealPath("/");
        log.info("** realPath => " + realPath);

        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/uploadFile/"
                    + entity.getPrgId() + entity.getPrgDnm() + "/";
        } else {
            realPath += "resources/uploadFile/" + entity.getPrgId() + entity.getPrgDnm() + "/";
        }
        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
        File file = new File(realPath);
        if (!file.exists()) {
            // 저장 폴더가 존재하지 않는경우 만들어줌
            file.mkdir();
        }

        if (entity.getPrgId() != null && entity.getPrgDnm() != null && "prgDtInsert".equals(entity.getType())
                && prgService.detailsCnt(entity.getPrgId(), entity.getPrgDnm()) == 0) {
            try {
                entity.getPrgFile();
                log.info(" ProgramDetails insert 성공 => " + prgService.dtSave(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" ProgramDetails insert Exception => " + e.toString());
                return "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (entity.getPrgId() != null && entity.getPrgDnm() != null && "prgDtUpdate".equals(entity.getType())
                && prgService.detailsCnt(entity.getPrgId(), entity.getPrgDnm()) > 0) {
            try {
                log.info(" ProgramDetails Update 성공 => " + prgService.dtSave(entity));
                message = "저장에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" ProgramDetails Update Exception => " + e.toString());
                return "저장에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if ("prgDtInsert".equals(entity.getType())) {
            message = "신규생성에 실패 했습니다. 같은 세부 프로그램이 있는지 확인하세요.";
        } else if ("prgDtUpdate".equals(entity.getType())) {
            message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
        } else {
            message = "요청에 실패했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }

    @PostMapping("/prg/prgdelete")
    public String prgdelete(@RequestBody ProgramId entityId) {
        String message = "";

        try {
            prgService.deleteById(entityId);
            log.info(" Program delete 성공 ");
            message = "삭제에 성공 했습니다.";
        } catch (Exception e) {
            log.info(" Program delete Exception => " + e.toString());
            message = "삭제에 실패 했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }

    @PostMapping("/prg/prgDtdelete")
    public String prgDtdelete(@RequestBody ProgramDetailsId entityId) {
        String message = "";

        try {
            prgService.deleteDtById(entityId);
            log.info(" ProgramDetails delete 성공 ");
            message = "삭제에 성공 했습니다.";
        } catch (Exception e) {
            log.info(" ProgramDetails delete Exception => " + e.toString());
            message = "삭제에 실패 했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }

    @PostMapping("/prgPln/prgPlnDtdelete")
    public String prgPlnDtdelete(@RequestBody ProgramDetailsId entityId) {
        String message = "";

        try {
            prgService.deleteDtById(entityId);
            log.info(" ProgramDetails delete 성공 ");
            message = "삭제에 성공 했습니다.";
        } catch (Exception e) {
            log.info(" ProgramDetails delete Exception => " + e.toString());
            message = "삭제에 실패 했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }

    @PostMapping("/prgPln/prgPlnSave")
    public String prgPlnSave(@RequestBody ProgramDetails entity, HttpServletRequest request) throws IOException {
        String message = "";

        String realPath = request.getSession().getServletContext().getRealPath("/");

        // // 1.2) realPath 를 이용해서 물리적 저장위치 (file1) 확인
        // if (!realPath.contains("apache-tomcat")) {
        // realPath =
        // "C:/Mtest/childProject/project/src/main/webapp/resources/uploadFile/"
        // + entity.getPrgId() + entity.getPrgDnm() + "/"; // 개발중.
        // } else {
        // realPath =
        // "E:/Mtest/IDESet/apache-tomcat-9.0.85/webapps/project/resources/uploadFile/"
        // + entity.getPrgId() + entity.getPrgDnm() + "/";
        // }
        if (!realPath.contains("tomcat9")) {
            realPath = "C:/Mtest/childProject/project/src/main/webapp/resources/uploadFile/"
                    + entity.getPrgId() + entity.getPrgDnm() + "/";
            ;
        } else {
            realPath += "resources/uploadFile/" + entity.getPrgId() + entity.getPrgDnm() + "/";
            ;
        }
        // // 1.3 폴더 만들기 (없을수도 있음을 가정, File 클래스)
        File file = new File(realPath);
        if (!file.exists()) {
            // 저장 폴더가 존재하지 않는경우 만들어줌
            file.mkdir();
        }

        if (entity
                .getPrgId() != null && entity.getTitle() != null
                && "prgPlnInsert".equals(entity.getType())
                && prgService.plnCnt(entity.getPrgId(), entity.getTitle()) == 0) {
            try {
                log.info(" ProgramDetails insert 성공 => " + prgService.dtSave(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" ProgramDetails insert Exception => " + e.toString());
                message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (entity.getPrgId() != null && entity.getTitle() != null && "prgPlnUpdate".equals(entity.getType())
                && prgService.plnCnt(entity.getPrgId(), entity.getTitle()) > 0) {
            try {
                log.info(" ProgramDetails Update 성공 => " + prgService.dtSave(entity));
                message = "저장에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" ProgramDetails Update Exception => " + e.toString());
                message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if ("prgPlnInsert".equals(entity.getType())) {
            message = "신규생성에 실패 했습니다. 같은 프로그램이 있는지 확인하세요.";
        } else if ("prgPlnUpdate".equals(entity.getType())) {
            message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
        } else {
            message = "요청에 실패했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }

    @GetMapping("/staff/resetPswrd")
    public String resetPswrd(Staff entity) {
        String message = "";

        entity.setStaffPsw(passwordEncoder.encode("mysql"));
        log.info(entity.getStaffPsw());
        try {
            stfService.updataPassword(entity.getStaffId(), entity.getStaffPsw());
            log.info(" Staff updataPassword 성공 ");
            message = "초기화에 성공했습니다.";
        } catch (Exception e) {
            log.info(" Staff updataPassword Exception => " + e.toString());
            message = "초기화에 실패했습니다. 관리자에게 문의하세요";
        }

        return message;
    } // resetPswrd

    @PostMapping("/staff/staffSave")
    public String staffSave(@RequestBody Staff entity
    // , @RequestParam String type
    ) {
        String message = "";
        log.info(" staff => " + entity);
        log.info(" type => " + entity.getType());
        if (stfService.countId(entity.getStaffId()) == 0 && "stfInsert".equals(entity.getType())) {
            try {
                entity.setStaffPsw(passwordEncoder.encode("mysql"));
                log.info(" staff insert 성공 => " + stfService.save(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" staff insert Exception => " + e.toString());
                message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (stfService.countId(entity.getStaffId()) == 1 && "stfUpdate".equals(entity.getType())) {
            try {
                log.info(" staff Update 성공 => " + stfService.save(entity));
                message = "저장에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" staff Update Exception => " + e.toString());
                message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if ("stfInsert".equals(entity.getType())) {
            message = "ID 가 중복되었습니다.";
        } else {
            message = "요청에 실패했습니다. 관리자에게 문의하세요.";
        }

        return message;
    } // staffSave

    @PostMapping("/staff/staffAtnSave")
    public String staffAtnSave(@RequestBody StaffAtn entity
    // , @RequestParam String type
    ) {
        String message = "";
        log.info(" staffAtn => " + entity);
        log.info(" type => " + entity.getType());
        if (stfService.countAtn(entity.getStaffId(), entity.getStaffDate()) == 0
                && "stfSpcnInsert".equals(entity.getType())) {
            try {
                log.info(" staffAtn insert 성공 => " + stfService.save(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" staffAtn insert Exception => " + e.toString());
                message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (stfService.countAtn(entity.getStaffId(), entity.getStaffDate()) == 1
                && "stfSpcnUpdate".equals(entity.getType())) {
            try {
                log.info(" staffAtn Update 성공 => " + stfService.save(entity));
                message = "저장에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" staffAtn Update Exception => " + e.toString());
                message = "저장에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if ("stfSpcnInsert".equals(entity.getType())) {
            message = "ID와 날짜가 중복되었습니다.";
        } else {
            message = "요청에 실패했습니다. 관리자에게 문의하세요.";
        }

        return message;
    } // staffSave

    @PostMapping("/staff/staffdelete")
    public String staffdelete(@RequestBody Staff entity) {
        String message = "";

        try {
            stfService.deleteById(entity.getStaffId());
            log.info(" member delete 성공 ");
            message = "삭제에 성공 했습니다.";
        } catch (Exception e) {
            log.info(" member delete Exception => " + e.toString());
            message = "삭제에 실패 했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }// staffdelete
}