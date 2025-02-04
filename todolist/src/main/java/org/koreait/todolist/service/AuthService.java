package org.koreait.todolist.service;

import lombok.RequiredArgsConstructor;
import org.koreait.todolist.dto.request.SignInRequestDto;
import org.koreait.todolist.dto.request.SignUpRequestDto;
import org.koreait.todolist.dto.response.ResponseDto;
import org.koreait.todolist.dto.response.SignInResponseDto;
import org.koreait.todolist.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private UserRepository userRepository;

    public ResponseDto<Boolean> signUp(SignUpRequestDto dto) {
        return null;
    }

    public ResponseDto<SignInResponseDto> signIn(SignInRequestDto dto) {
        return null;
    }
}
