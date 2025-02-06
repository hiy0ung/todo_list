package org.koreait.todolist.controller;

import lombok.RequiredArgsConstructor;
import org.koreait.todolist.dto.request.SignInRequestDto;
import org.koreait.todolist.dto.request.SignUpRequestDto;
import org.koreait.todolist.dto.response.ResponseDto;
import org.koreait.todolist.dto.response.SignInResponseDto;
import org.koreait.todolist.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("sign-up")
    public ResponseEntity<ResponseDto<Boolean>> signUp(@RequestBody SignUpRequestDto dto) {
        ResponseDto<Boolean> response = authService.signUp(dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("sign-in")
    public ResponseEntity<ResponseDto<SignInResponseDto>> signUp(@RequestBody SignInRequestDto dto) {
        ResponseDto<SignInResponseDto> response = authService.signIn(dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }
}
