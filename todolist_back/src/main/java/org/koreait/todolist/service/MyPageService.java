package org.koreait.todolist.service;

import org.koreait.todolist.common.ResponseMessage;
import org.koreait.todolist.dto.request.MyPageRequestDto;
import org.koreait.todolist.dto.response.MyPageResponseDto;
import org.koreait.todolist.dto.response.ResponseDto;
import org.koreait.todolist.entity.User;
import org.koreait.todolist.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptpasswordEncoder;

    public MyPageService(UserRepository userRepository, BCryptPasswordEncoder bCryptpasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptpasswordEncoder = bCryptpasswordEncoder;
    }

    public ResponseDto<MyPageResponseDto> getAllInfo(String userId) {
        MyPageResponseDto data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            data = new MyPageResponseDto(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    public ResponseDto<MyPageResponseDto> updateUserInfo(String userId, MyPageRequestDto dto) {
        MyPageResponseDto data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            String newPassword = user.getPassword();
            String newEmail = user.getEmail();

            if (dto.getPassword() != null && !dto.getPassword().isEmpty() &&
                !bCryptpasswordEncoder.matches(dto.getPassword(), user.getPassword())) {
                newPassword = bCryptpasswordEncoder.encode(dto.getPassword());
            }

            if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
                newEmail = dto.getEmail();
            }

            User updateUser = user.toBuilder()
                    .password(newPassword)
                    .email(newEmail)
                    .build();

            userRepository.save(updateUser);
            data = new MyPageResponseDto(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    public ResponseDto<Void> deleteUserInfo(String userId) {
        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            userRepository.delete(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, null);
    }
}
