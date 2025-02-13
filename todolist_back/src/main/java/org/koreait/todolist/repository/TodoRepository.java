package org.koreait.todolist.repository;

import org.koreait.todolist.entity.Todo;
import org.koreait.todolist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUser(User user);

    Optional<Todo> findByIdAndUser(Long id, User user);
}
