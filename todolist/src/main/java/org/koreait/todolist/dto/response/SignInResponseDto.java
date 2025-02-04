package org.koreait.todolist.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInResponseDto {
    private String token;
    private int exprTime;
}
