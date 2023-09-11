package com.ssafy.benepick.domain.card.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category3 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long category3Id;

	@Column(nullable = false)
	private String category3Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category3_id" , nullable = false)
	private Category2 category2;
}
