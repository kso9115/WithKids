package com.child.project.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.child.project.jwtToken.TokenProvider;
import com.child.project.domain.StaffDTO;
import com.child.project.domain.UserDTO;
import com.child.project.entity.ProgramId;
// import com.child.project.domain.StaffDTO;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffAtn;
import com.child.project.entity.StaffPrv;
import com.child.project.service.StaffService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Log4j2
@RestController
@RequestMapping(value = "/api/staff")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class StaffController {

    StaffService service;
    PasswordEncoder passwordEncoder;
    TokenProvider tokenProvider;

    @GetMapping("/staffList")
    public List<StaffDTO> prgList() {
        List<StaffDTO> list = service.findJoinAll();

        return list;
    } // staffList

    @GetMapping("/staffPstList")
    public List<StaffPrv> staffPst() {
        List<StaffPrv> list = service.findPrvAll();

        return list;
    } // staffPstList

    @GetMapping("/staffAtnList")
    public List<StaffAtn> staffAtn() {
        List<StaffAtn> list = service.findAtnAll();
        log.info("StaffAtn list " + list);
        return list;
    } // staffAtnList

    @PostMapping("/staffAtnId")
    public List<StaffAtn> staffAtnId(@RequestBody Staff entity) {
        log.info("@@@@entity id " + entity);
        List<StaffAtn> list = service.findAtnId(entity.getStaffId());
        log.info("@@@@StaffAtn id " + list);
        return list;
    } // staffAtnId

    // @PostMapping("/staffLogin")
    // public UserDTO staffLogin(Staff entity) {

    //     String password = entity.getStaffPsw();

    //     entity = service.findOne(entity.getStaffId());

    //     if( entity != null && passwordEncoder.matches(password, entity.getStaffPsw())) {
    //         final String token = tokenProvider.create(entity);
    //         final UserDTO userDTO = UserDTO.builder()
    //                 .token(token)
    //                 .id(entity.getStaffId())
    //                 .username(entity.getStaffNm())
    //                 .build();
    //         log.info("login 성공 token = " + token);
    //         return ResponseEntity.ok().body(UserDTO);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
    //                 .body("Login failed");
    //     }
    //     // return entity;
    // } // staffLogin

    @GetMapping("/resetPswrd")
    public String resetPswrd(Staff entity) {
        String message = "";

        entity.setStaffPsw(passwordEncoder.encode("mysql"));
        log.info(entity.getStaffPsw());
        try {
            service.updataPassword(entity.getStaffId(), entity.getStaffPsw());
            log.info(" member updataPassword 성공 ");
            message = "초기화에 성공했습니다.";
        } catch (Exception e) {
            log.info(" member updataPassword Exception => " + e.toString());
            message = "초기화에 실패했습니다. 관리자에게 문의하세요";
        }

        return message;
    } // resetPswrd

    @PostMapping("/staffSave")
    public String staffSave(@RequestBody Staff entity
    // , @RequestParam String type
    ) {
        String message = "";
        log.info(" staff => " + entity);
        log.info(" type => " + entity.getType());
        if (service.countId(entity.getStaffId()) == 0 && "stfInsert".equals(entity.getType())) {
            try {
                entity.setStaffPsw(passwordEncoder.encode("mysql"));
                log.info(" staff insert 성공 => " + service.save(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" staff insert Exception => " + e.toString());
                message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (service.countId(entity.getStaffId()) == 1 && "stfUpdate".equals(entity.getType())) {
            try {
                log.info(" staff Update 성공 => " + service.save(entity));
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

    @PostMapping("/staffAtnSave")
    public String staffAtnSave(@RequestBody StaffAtn entity
    // , @RequestParam String type
    ) {
        String message = "";
        log.info(" staffAtn => " + entity);
        log.info(" type => " + entity.getType());
        if (service.countId(entity.getStaffId()) == 0 && "stfSpcnInsert".equals(entity.getType())) {
            try {
                log.info(" staffAtn insert 성공 => " + service.save(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" staffAtn insert Exception => " + e.toString());
                message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (service.countId(entity.getStaffId()) == 1 && "stfSpcnUpdate".equals(entity.getType())) {
            try {
                log.info(" staffAtn Update 성공 => " + service.save(entity));
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

    @PostMapping("/staffdelete")
    public String staffdelete(@RequestBody Staff entity) {
        String message = "";

        try {
            service.deleteById(entity.getStaffId());
            log.info(" member delete 성공 ");
            message = "삭제에 성공 했습니다.";
        } catch (Exception e) {
            log.info(" member delete Exception => " + e.toString());
            message = "삭제에 실패 했습니다. 관리자에게 문의하세요.";
        }

        return message;
    }// staffdelete

}
