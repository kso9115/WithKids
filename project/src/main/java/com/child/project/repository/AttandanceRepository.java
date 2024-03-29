package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.child.project.entity.Attandance;
import com.child.project.entity.AttandanceId;


@Repository
public interface AttandanceRepository extends JpaRepository<Attandance, AttandanceId>  {

    @Query(value = "select * from attandance order by mem_name", nativeQuery = true)
    List<Attandance> findAttList();
}
