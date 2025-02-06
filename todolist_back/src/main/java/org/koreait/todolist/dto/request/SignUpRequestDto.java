package org.koreait.todolist.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignUpRequestDto {
    @NotNull
    private String userId;

    @NotNull
    private String password;

    @NotNull
    private String checkPassword;

    @NotNull
    private String name;

    @NotNull
    private String email;
}
