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

    private List<MultipartFile> files;
    // private List<Object> files;
    // private MultipartFile files1;
    // private MultipartFile files2;
    // private MultipartFile files3;

}
