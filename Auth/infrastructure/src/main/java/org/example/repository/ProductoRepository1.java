package org.example.repository;

import org.example.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository1 extends JpaRepository<Producto, Integer> {
}