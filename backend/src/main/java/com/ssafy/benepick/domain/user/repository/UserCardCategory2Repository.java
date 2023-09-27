package com.ssafy.benepick.domain.user.repository;

import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.entity.UserCardCategory2;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
public interface UserCardCategory2Repository extends JpaRepository<UserCardCategory2,Long> {
    List<UserCardCategory2> findByUserCardCategory1(UserCardCategory1 userCardCategory1);
}
