package com.ssafy.benepick.domain.user.repository;

import com.ssafy.benepick.domain.user.entity.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.domain.user.entity.UserCardCategory1;

import java.util.List;

public interface UserCardCategory1Repository extends JpaRepository<UserCardCategory1,Long > {
    List<UserCardCategory1> findByUserCard(UserCard usercard);
}
