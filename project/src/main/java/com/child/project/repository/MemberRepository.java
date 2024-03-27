package com.child.project.repository;

import java.util.List;
// import org.hibernate.mapping.List; 잘못임포트 => 제네릭타입 오류 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

        // List<Member> findAll();
        // List<Member> findbyMembers(long mem_serial);

        // JPQL : Entity 접근

        // Membermanagement Search
        @Query(value = "select * from member where STR_TO_DATE(mem_str, '%Y-%m-%d') between STR_TO_DATE(:mem_str, '%Y-%m-%d') AND STR_TO_DATE(:memEndF, '%Y-%m-%d') "
                        + "and mem_name like CONCAT('%',:mem_name,'%') and mem_sex like CONCAT('%',:mem_sex,'%') "
                        + "and mem_responsible_person like CONCAT('%',:mem_responsible_person,'%') "
                        + "and mem_status like CONCAT('%',:mem_status,'%')  "
                        + "order by mem_serial", nativeQuery = true)
        List<Member> searchList(@Param("mem_str") String memStr, @Param("memEndF") String memEndF,
                        @Param("mem_name") String memName, @Param("mem_sex") String memSex,
                        @Param("mem_responsible_person") String memResPerson,
                        @Param("mem_status") String memStatus);

        // Admission Search
        @Query(value = "select * from member where STR_TO_DATE(mem_str,'%Y-%m-%d') between STR_TO_DATE(:mem_str,'%Y-%m-%d') and STR_TO_DATE(:memEndF, '%Y-%m-%d')"
                        + "and mem_name like CONCAT('%',:mem_name,'%') and mem_responsible_person like CONCAT('%',:mem_responsible_person,'%')"
                        + " and admission_status like CONCAT('%',:admission_status,'%') ", nativeQuery = true)
        List<Member> findSearch(@Param("mem_str") String memStr, @Param("memEndF") String memEndF,
                        @Param("mem_name") String memName, @Param("mem_responsible_person") String memResPerson,
                        @Param("admission_status") String admissionStatus);

}