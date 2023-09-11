package com.ssafy.benepick.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.benepick.domain.user.entity.UserCard;

public interface UserCardRepository extends JpaRepository<UserCard, Long> {
}
