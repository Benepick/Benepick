package com.ssafy.benepick.mydata.domain.card.entity;

import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCategory3ResponseDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "category3" , schema = "benepick_bank")
public class Category3 {

	@Id
	@Column(name = "category3_id")
	private Long category3Id;

	@Column(nullable = false , name = "category3_name")
	private String category3Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category2_id" , nullable = false)
	private Category2 category2;

	public ApiCategory3ResponseDto toDto(){
		return ApiCategory3ResponseDto.builder()
				.category3Id(category3Id)
				.category3Name(category3Name)
				.build();

	}
}
