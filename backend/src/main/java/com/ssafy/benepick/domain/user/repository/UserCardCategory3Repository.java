package com.ssafy.benepick.domain.user.repository;

import com.ssafy.benepick.domain.user.entity.UserCardCategory2;
import com.ssafy.benepick.domain.user.entity.UserCardCategory3;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
public interface UserCardCategory3Repository extends JpaRepository<UserCardCategory3,Long> {
    List<UserCardCategory3> findByUserCardCategory2(UserCardCategory2 userCardCategory2);
}
