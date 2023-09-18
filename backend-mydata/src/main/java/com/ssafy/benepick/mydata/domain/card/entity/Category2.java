package com.ssafy.benepick.mydata.domain.card.entity;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCategory2ResponseDto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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


	public ApiCategory2ResponseDto toDto(){
		return ApiCategory2ResponseDto.builder()
				.category2Id(category2Id)
				.category3List(new ArrayList<>())
				.category2Name(category2Name)
				.build();

	}
}
