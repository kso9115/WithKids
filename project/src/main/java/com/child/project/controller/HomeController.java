package com.child.project.controller;

import org.springframework.stereotype.Controller;

import com.child.project.service.ProgramService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class HomeController {

	ProgramService prgService;

}
