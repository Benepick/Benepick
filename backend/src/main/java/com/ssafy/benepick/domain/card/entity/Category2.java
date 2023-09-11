package com.ssafy.benepick.domain.card.entity;

import java.util.List;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category2 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long category2Id;

	@Column(nullable = false)
	private String category2Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category1_id" , nullable = false)
	private Category1 category1;

	@OneToMany(mappedBy = "category2", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Category3> category3List;
}
