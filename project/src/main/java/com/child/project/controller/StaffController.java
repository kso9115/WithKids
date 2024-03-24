package com.child.project.controller;

import org.springframework.web.bind.annotation.RestController;

import com.child.project.domain.StaffDTO;
// import com.child.project.domain.StaffDTO;
import com.child.project.entity.Staff;
import com.child.project.entity.StaffPrv;
import com.child.project.service.StaffService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.PostMapping;

@Log4j2
@RestController
@RequestMapping(value = "/api/staff")
@AllArgsConstructor // 개별적으로 @Autowired 하지않아도 된다. 생략가능
public class StaffController {

    StaffService service;

    @GetMapping("/staffList")
    public List<StaffDTO> prgList() {
        List<StaffDTO> list = service.findJoinAll();
        
        return list;
    } // staffList

    @GetMapping("/staffPstList")
    public List<StaffPrv> staffPst() {
        List<StaffPrv> list = service.findPrvAll();

        return list;
    } // prgList
}
