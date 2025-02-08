package org.koreait.todolist.service;

import lombok.RequiredArgsConstructor;
import org.koreait.todolist.common.ResponseMessage;
import org.koreait.todolist.dto.request.TodoRequestDto;
import org.koreait.todolist.dto.request.UpdateTodoRequestDto;
import org.koreait.todolist.dto.response.ResponseDto;
import org.koreait.todolist.dto.response.TodoResponseDto;
import org.koreait.todolist.entity.Todo;
import org.koreait.todolist.entity.User;
import org.koreait.todolist.repository.TodoRepository;
import org.koreait.todolist.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    // 생성
    public ResponseDto<TodoResponseDto> addTodo(String userId, TodoRequestDto dto) {
        TodoResponseDto data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            Todo todo = Todo.builder()
                    .user(user)
                    .content(dto.getContent())
                    .status(dto.getStatus() != null ? dto.getStatus() : false)
                    .build();

            todoRepository.save(todo);
            data = new TodoResponseDto(todo);

        } catch(Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    // 전체 조회
    public ResponseDto<List<TodoResponseDto>> getTodo(String userId) {
        List<TodoResponseDto> data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            data = todoRepository.findByUser(user).stream()
                    .map(TodoResponseDto::new)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    // 수정
    public ResponseDto<TodoResponseDto> updateContent(String userId, Long id, UpdateTodoRequestDto dto) {
        TodoResponseDto data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            Todo todo = todoRepository.findByIdAndUser(id, user)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_DATA));

            todo.setContent(dto.getContent());
            data = new TodoResponseDto(todo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    // 상태 수정
    public ResponseDto<TodoResponseDto> updateStatus(String userId, Long id, Boolean updateStatus) {
        TodoResponseDto data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            Todo todo = todoRepository.findByIdAndUser(id, user)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_DATA));

            todo.setStatus(updateStatus);
            todoRepository.save(todo);
            data = new TodoResponseDto(todo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    // 삭제
    public ResponseDto<Void> deleteTodo(String userId, Long id) {
        try {
            User user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_USER));

            Todo todo = todoRepository.findByIdAndUser(id, user)
                    .orElseThrow(() -> new IllegalArgumentException(ResponseMessage.NOT_EXIST_DATA));

            todoRepository.delete(todo);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, null);
    }
}
