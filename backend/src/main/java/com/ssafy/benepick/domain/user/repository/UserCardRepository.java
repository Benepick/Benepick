package com.ssafy.benepick.domain.user.repository;

import com.ssafy.benepick.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.benepick.domain.user.entity.UserCard;

import java.util.List;

public interface UserCardRepository extends JpaRepository<UserCard, Long> {
    List<UserCard> findByUser(User user);
}
