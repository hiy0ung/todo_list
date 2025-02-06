package org.koreait.todolist.controller;

import lombok.RequiredArgsConstructor;
import org.koreait.todolist.dto.request.TodoRequestDto;
import org.koreait.todolist.dto.request.UpdateTodoRequestDto;
import org.koreait.todolist.dto.response.ResponseDto;
import org.koreait.todolist.dto.response.TodoResponseDto;
import org.koreait.todolist.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    // 생성
    @PostMapping
    public ResponseEntity<ResponseDto<TodoResponseDto>> addTodo (
            @AuthenticationPrincipal String userId,
            @RequestBody TodoRequestDto dto
    ) {
        ResponseDto<TodoResponseDto> response = todoService.addTodo(userId, dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    // 전체 조회
    @GetMapping
    public ResponseEntity<ResponseDto<List<TodoResponseDto>>> getTodo(@AuthenticationPrincipal String userId) {
        ResponseDto<List<TodoResponseDto>> response = todoService.getTodo(userId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    // 내용 수정
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto<TodoResponseDto>> updateContent(
            @AuthenticationPrincipal String userId,
            @PathVariable Long id,
            @RequestBody UpdateTodoRequestDto dto
    ) {
        ResponseDto<TodoResponseDto> response = todoService.updateContent(userId, id, dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    // 상태 수정
    @PutMapping("/status/{id}")
    public ResponseEntity<ResponseDto<TodoResponseDto>> updateStatus(
            @AuthenticationPrincipal String userId,
            @PathVariable Long id,
            @RequestParam Boolean updateStatus
    ) {
        ResponseDto<TodoResponseDto> response = todoService.updateStatus(userId, id, updateStatus);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto<Void>> deleteTodo(
            @AuthenticationPrincipal String userId,
            @PathVariable Long id
    ) {
        ResponseDto<Void> response = todoService.deleteTodo(userId, id);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }
}
