package com.child.project.domain;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Files {

    private List<Integer> brf_meal;
    private List<Integer> lnc_meal;
    private List<Integer> dnr_meal;
    private List<Integer> snk_meal;
    // private List<Object> files;
    // private MultipartFile files1;
    // private MultipartFile files2;
    // private MultipartFile files3;

}
