package org.koreait.todolist.service;

import lombok.RequiredArgsConstructor;
import org.koreait.todolist.common.ResponseMessage;
import org.koreait.todolist.dto.request.SignInRequestDto;
import org.koreait.todolist.dto.request.SignUpRequestDto;
import org.koreait.todolist.dto.response.ResponseDto;
import org.koreait.todolist.dto.response.SignInResponseDto;
import org.koreait.todolist.entity.User;
import org.koreait.todolist.provider.JwtProvider;
import org.koreait.todolist.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final BCryptPasswordEncoder bCryptpasswordEncoder;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public ResponseDto<Boolean> signUp(SignUpRequestDto dto) {
        String userId = dto.getUserId();
        String password = dto.getPassword();
        String checkPassword = dto.getCheckPassword();
        String name = dto.getName();
        String email = dto.getEmail();


        if (userId == null || userId.isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.INVALID_USER_ID);
        }

        if (password == null || password.isEmpty() || checkPassword == null || checkPassword.isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.INVALID_PASSWORD);
        }

        if (!password.equals(checkPassword)) {
            return ResponseDto.setFailed(ResponseMessage.NOT_MATCH_PASSWORD);
        }

        if (password.length() < 8) {
            return ResponseDto.setFailed(ResponseMessage.WEAK_PASSWORD);
        }

        if (name == null || name.isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.INVALID_NAME);
        }

        if (email == null || email.isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.INVALID_EMAIL);
        }

        try {
            String encodePassword = bCryptpasswordEncoder.encode(password);
            User user = User.builder()
                    .userId(userId)
                    .password(encodePassword)
                    .name(name)
                    .name(name)
                    .email(email)
                    .build();
            userRepository.save(user);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, true);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInRequestDto dto) {
        String userId = dto.getUserId();
        String password = dto.getPassword();

        SignInResponseDto data = null;

        if (userId == null || userId.isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.INVALID_USER_ID);
        }

        if (password == null || password.isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.INVALID_PASSWORD);
        }

        try {
            User user = userRepository.findByUserId(userId).orElse(null);

            if (user == null) {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
            }

            if (!bCryptpasswordEncoder.matches(password, user.getPassword())) {
                return ResponseDto.setFailed(ResponseMessage.NOT_MATCH_PASSWORD);
            }

            String token = jwtProvider.generateJwtToken(userId);
            int exprTime = jwtProvider.getExpiration();
            data = new SignInResponseDto(token, exprTime);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }
}
