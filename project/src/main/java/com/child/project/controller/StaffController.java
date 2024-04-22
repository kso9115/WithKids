package com.child.project.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.child.project.jwtToken.TokenProvider;
import com.child.project.domain.StaffDTO;
import com.child.project.domain.UserDTO;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffAtn;
import com.child.project.entity.StaffPrv;
import com.child.project.service.StaffService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:8080")
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

    @GetMapping("/staffSearch")
    public List<StaffDTO> staffSearch(Staff entity) {
        log.info(" entity " + entity);
        List<StaffDTO> list = service.findSearch(entity);
        log.info(" list " + list);
        return list;
    } // prgList

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

    @PostMapping("/staffLogin")
    public ResponseEntity<?> staffLogin(@RequestBody Staff entity) {
        // log.info(" entityn = " + entity);
        String password = entity.getStaffPsw();
        try {
            StaffDTO dto = service.findJoinOne(entity.getStaffId());

            log.info(dto.getStaffLeave());
            // log.info("dto의 password => " + dto.getStaffPsw());
            // log.info("entity password => " + entity.getStaffPsw());
            if (dto.getStaffLeave() == 0) {
                if (dto != null && passwordEncoder.matches(password, dto.getStaffPsw())) {
                    // log.info("일단 dto는 null이 아니고 pass워드도 맞음");
                    final String token = tokenProvider.create(dto);

                    final UserDTO userDTO = UserDTO.builder()
                            .token(token)
                            .id(dto.getStaffId())
                            .username(dto.getStaffNm())
                            .staffChlCr(dto.getStaffChlCr())
                            .staffCmnMng(dto.getStaffCmnMng())
                            .staffCntMng(dto.getStaffCntMng())
                            .build();
                    log.info("login 성공 token = " + token);
                    return ResponseEntity.ok().body(userDTO);
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body("Login failed"); // 관리자 id,pw 오류
                }

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Login failed"); // 관리자 휴직 혹은 퇴사
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Login failed"); // 아이디 없음
            // return entity;
        }
    } // staffLogin

    @GetMapping("/resetPswrd")
    public String resetPswrd(Staff entity) {
        String message = "";

        entity.setStaffPsw(passwordEncoder.encode("mysql"));
        log.info(entity.getStaffPsw());
        try {
            service.updataPassword(entity.getStaffId(), entity.getStaffPsw());
            log.info(" Staff updataPassword 성공 ");
            message = "초기화에 성공했습니다.";
        } catch (Exception e) {
            log.info(" Staff updataPassword Exception => " + e.toString());
            message = "초기화에 실패했습니다. 관리자에게 문의하세요";
        }

        return message;
    } // resetPswrd

    @PostMapping("/changePswrd")
    public String changePswrd(@RequestBody Staff entity) {
        String message = "";
        String password = entity.getStaffPsw();
        log.info(" Staff updataPassword " + entity.getStaffPsw());
        try {
            StaffDTO dto = service.findJoinOne(entity.getStaffId());

            if (dto != null && passwordEncoder.matches(password, dto.getStaffPsw())) {
                entity.setStaffPsw(passwordEncoder.encode(entity.getType()));
                service.updataPassword(entity.getStaffId(), entity.getStaffPsw());
                return message = "성공";
            } else {
                return message = "입력하신 기존 비밀번호가 올바르지 않습니다."; // 관리자 id,pw 오류
            }
        } catch (Exception e) {
            return message = "비밀번호 변경에 실패했습니다. 관리자에게 문의 바랍니다."; // 아이디 없음
            // return entity;
        }
        // entity.setStaffPsw(passwordEncoder.encode(entity.getStaffPsw()));
        // log.info(entity.getStaffPsw());
        // try {
        // service.updataPassword(entity.getStaffId(), entity.getStaffPsw());
        // log.info(" member updataPassword 성공 ");
        // message = "초기화에 성공했습니다.";
        // } catch (Exception e) {
        // log.info(" member updataPassword Exception => " + e.toString());
        // message = "초기화에 실패했습니다. 관리자에게 문의하세요";
        // }
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
        if (service.countAtn(entity.getStaffId(), entity.getStaffDate()) == 0
                && "stfSpcnInsert".equals(entity.getType())) {
            try {
                log.info(" staffAtn insert 성공 => " + service.save(entity));
                message = "신규생성에 성공 했습니다.";
            } catch (Exception e) {
                log.info(" staffAtn insert Exception => " + e.toString());
                message = "신규생성에 실패 했습니다. 관리자에게 문의하세요.";
            }
        } else if (service.countAtn(entity.getStaffId(), entity.getStaffDate()) == 1
                && "stfSpcnUpdate".equals(entity.getType())) {
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
