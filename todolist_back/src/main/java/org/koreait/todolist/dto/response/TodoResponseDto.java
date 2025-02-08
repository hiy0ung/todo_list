package org.koreait.todolist.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.koreait.todolist.entity.Todo;

@Data
@NoArgsConstructor
public class TodoResponseDto {
    private Long id;
    private String content;
    private Boolean status;

    public TodoResponseDto (Todo todo) {
        this.id = todo.getId();
        this.content = todo.getContent();
        this.status = todo.getStatus();
    }
}
