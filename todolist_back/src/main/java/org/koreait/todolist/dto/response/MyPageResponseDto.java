package org.koreait.todolist.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.koreait.todolist.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyPageResponseDto {
    private Long id;
    private String userId;
    private String password;
    private String name;
    private String email;

    public MyPageResponseDto(User user) {
        this.id = user.getId();
        this.userId = user.getUserId();
        this.password = user.getPassword();
        this.name = user.getName();
        this.email = user.getEmail();
    }
}
