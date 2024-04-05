package com.child.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.child.project.entity.Attandance;
import com.child.project.entity.AttandanceId;

public interface AttandanceRepository extends JpaRepository<Attandance, AttandanceId> {

        // DB리스트 데이터 싹 가져오기 : 학생별, 일자별 출석현황은 front단에서 처리
        @Query(value = "select * from attandance order by mem_name", nativeQuery = true)
        List<Attandance> findAttList();

        // 월을 기준으로 데이터 전체 가져오기
        // @Query(value = "select * from attandance "
        // + "where substring(attandance_date, locate(\"-\",attandance_date)+1, 2) =
        // (:month);", nativeQuery = true)
        // List<Attandance> findAttList(@Param("month")String month);

        @Query(value = "select mem_name, attandance_status from attandance where attandance_date = (:curruentDate)", nativeQuery = true)
        List<Attandance> findAttList2(@Param("curruentDate") String curruentDate);

        // 문제 : 달별로 출석 데이터 출력
        @Query(value = "select * from attandance where substring(attandance_date, 1, 7) = (:attandance_date)", nativeQuery = true)
        // @Query(value = "select * from attandance where attandance_date =
        // substring(DATE(NOW()), 1, 10)", nativeQuery = true)
        // @Query(value = "select * from attandance where attandance_date =
        // DATE_FORMAT(NOW(), '%Y-%m-%d')", nativeQuery = true)
        List<Attandance> findAttList3(@Param("attandance_date") String attandance_date);

        // 멤버에서 처리!!!!!!!!!!!!! => 왜냐면 이름이랑 시리얼번호만 중복없이 받으믄대니까!!
        // 리스트에서 중복된 시리얼 값을 제외하고 가져오기 : 퇴소한애들은 안져와야되니까 member에서 갖고오기
        // with 절 사용 시 다른 테이블명으로 생성되므로 기존 엔티티와 매칭되지 않음
        // @Query(value = "with unique_serials AS (select distinct mem_serial from
        // attandance) select mem_serial from unique_serials ", nativeQuery = true)
        @Query(value = "select * from member where mem_status='이용' ", nativeQuery = true)
        List<Attandance> findAdmissionList();

        // 관리자 페이지 내 출,결석 처리
        @Query(value = "update attandace set attandance_status = (:attandance_status) "
                        + "where mem_serial = (:mem_serial) and attandance_date = (:attandance_date)", nativeQuery = true)
        void save(@Param("attandance_status") String attandance_status,
                        @Param("mem_serial") String mem_serial,
                        @Param("attandance_date") String attandance_date);

        // 유저 페이지 내 출석 처리 : 출석 버튼 클릭 시 본인 출석 입력되도록
        @Query(value = "insert into attandance value(:mem_serial, :attandance_date, :mem_name, :attandance_status)"
                        + "where mem_serial=(:mem_serial) and attandance_date=(:attandance_date)", nativeQuery = true)
        void userSave(@Param("mem_serial") String mem_serial,
                        @Param("attandance_status") String attandance_status,
                        @Param("mem_name") String mem_name,
                        @Param("attandance_date") String attandance_date);
}
