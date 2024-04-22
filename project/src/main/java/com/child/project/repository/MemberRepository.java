package com.child.project.repository;

import java.util.List;
// import org.hibernate.mapping.List; 잘못임포트 => 제네릭타입 오류 

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

        @Query(value = "select * from member", nativeQuery = true)
        List<Member> findAll();
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
                        + " and mem_status like CONCAT('%',:mem_status,'%') ", nativeQuery = true)
        List<Member> findSearch(@Param("mem_str") String memStr, @Param("memEndF") String memEndF,
                        @Param("mem_name") String memName, @Param("mem_responsible_person") String memResPerson,
                        @Param("mem_status") String memStatus);

        // 리스트에서 중복된 시리얼 값을 제외하고 가져오기 : 퇴소한애들은 안져와야되니까 member에서 갖고오기
        // with 절 사용 시 다른 테이블명으로 생성되므로 기존 엔티티와 매칭되지 않음
        // @Query(value = "with unique_serials AS (select distinct mem_serial from
        // attandance) select mem_serial from unique_serials ", nativeQuery = true)
        @Query(value = "select * from member where mem_status='이용' ", nativeQuery = true)
        List<Member> findAdmissionList();

        // 비밀번호 초기화
        // @Query(value = "delete")

        @Modifying
        @Transactional
        @Query(value = "update member set mem_login_pw=:mem_login_pw where mem_serial=:mem_serial", nativeQuery = true)
        void resetPassword(@Param("mem_login_pw") String memLoginPW, @Param("mem_serial") String memSerial);

        //@Query(value = "select A.*,B.education_background,B.education_name,B.education_grade,B.education_teacher,B.education_teacher_phone from member A left join mem_education B on A.mem_serial = B.mem_serial where A.mem_serial = :mem_serial", nativeQuery = true)
        @Query(value = "select * from member where mem_serial = :mem_serial", nativeQuery = true)
        Member selectOneMember(@Param("mem_serial") String memSerial);

}