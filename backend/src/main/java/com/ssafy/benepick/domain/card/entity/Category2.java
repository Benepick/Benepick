package com.ssafy.benepick.domain.card.entity;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.entity.UserCardCategory2;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category2" , schema = "benepick_bank")
public class Category2 {

	@Id
	@Column(name = "category2_id")
	private Long category2Id;

	@Column(nullable = false ,name = "category2_name")
	private String category2Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category1_id" , nullable = false)
	private Category1 category1;

	@OneToMany(mappedBy = "category2", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Category3> category3List;


	public UserCardCategory2 toUserCardCategory2(){
		return UserCardCategory2.builder()
			.userCardCategory2Id(category2Id)
			.userCardCategory2Name(category2Name)
			.userCardCategory3List(new ArrayList<>())
			.build();
	}
}
