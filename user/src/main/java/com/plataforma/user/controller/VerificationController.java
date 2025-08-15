package com.plataforma.user.controller;


import org.springframework.web.bind.annotation.RestController;

import com.plataforma.user.repository.StudentRepository;


@RestController
public class VerificationController {

 //   @Autowired
    private StudentRepository StudentRepository;

  //  @Autowired
  //  private JwtTokenUtil jwtUtil;
    
// @GetMapping("/req/signup/veryfy")
 //   public ResponseEntity verifyEmail(@RequestParam("token") String token) {
   //     String emailString = jwtUtil.extractEmail(token);
   //     Student student = StudentRepository.findByEmail(emailString);
   //     if (student == null || student.isVerificationToken()) {
    //        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Token Expired!");
   //     }
  //      if (jwtUtil.validateToken(token) || !student.isVerificationToken().equals(token)){
   //         return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Token Expired!");
        
   //     }
  //      student.setVerificationToken(null);
   //     student.setVerified(true);
 //       StudentRepository.save(student);
//
  //      return ResponseEntity.status(HttpStatus.CREATED).body("Email successfully verified!");
    
    }
    

    

