package org.koreait.todolist.controller;

import lombok.RequiredArgsConstructor;
import org.koreait.todolist.dto.request.MyPageRequestDto;
import org.koreait.todolist.dto.response.MyPageResponseDto;
import org.koreait.todolist.dto.response.ResponseDto;
import org.koreait.todolist.service.MyPageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/my-page")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<ResponseDto<MyPageResponseDto>> getAllInfo(@AuthenticationPrincipal String userId) {
        ResponseDto<MyPageResponseDto> response = myPageService.getAllInfo(userId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @PutMapping
    public ResponseEntity<ResponseDto<MyPageResponseDto>> updateUserInfo(@AuthenticationPrincipal String userId, @RequestBody MyPageRequestDto dto) {
        ResponseDto<MyPageResponseDto> response = myPageService.updateUserInfo(userId, dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @DeleteMapping
    public ResponseEntity<ResponseDto<Void>> deleteUserInfo(@AuthenticationPrincipal String userId) {
        ResponseDto<Void> response = myPageService.deleteUserInfo(userId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }
}
