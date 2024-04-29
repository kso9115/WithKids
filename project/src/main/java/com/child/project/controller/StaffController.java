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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                    List<String> roleList = new ArrayList<>();
                    Map<String, Object> dataMap = new HashMap<>();

                    if (dto.getStaffCntMng() == 2)
                        roleList.add("PRGMANAGER");
                    if (dto.getStaffChlCr() == 2)
                        roleList.add("MEMMANAGER");
                    if (dto.getStaffCntMng() != 2 && dto.getStaffChlCr() != 2)
                        roleList.add("USER");

                    dataMap.put("userId", dto.getStaffId());
                    // dataMap.put("pw",this.password);
                    dataMap.put("roleList", roleList);
                    log.info("roleList 가 없지?? " + roleList);
                    // log.info("일단 dto는 null이 아니고 pass워드도 맞음");
                    final String token = tokenProvider.createToken(dataMap);

                    final UserDTO userDTO = UserDTO.builder()
                            .token(token)
                            .id(dto.getStaffId())
                            .username(dto.getStaffNm())
                            .staffChlCr(dto.getStaffChlCr())
                            .staffCmnMng(dto.getStaffCmnMng())
                            .staffCntMng(dto.getStaffCntMng())
                            .roleList(roleList)
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

    

}
