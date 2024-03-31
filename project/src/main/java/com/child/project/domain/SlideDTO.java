package com.child.project.domain;

import java.util.List;

import com.child.project.entity.Program;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SlideDTO {

    private List<Program> entity;

    private String prgImg;
}
