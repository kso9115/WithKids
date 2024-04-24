package com.child.project.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.child.project.domain.AttandanceDTO;
import com.child.project.entity.Attandance;
import com.child.project.entity.AttandanceId;

@Repository
public interface AttandanceRepository extends JpaRepository<Attandance, AttandanceId> {

        // private final JdbcTemplate jdbcTemplate;

        // DB리스트 데이터 싹 가져오기 : 학생별, 일자별 출석현황은 front단에서 처리
		// 현재 사용X
        @Query(value = "select * from attandance order by mem_name", nativeQuery = true)
        List<Attandance> findAttList();

        // 월을 기준으로 데이터 전체 가져오기
        // @Query(value = "select * from attandance "
        // + "where substring(attandance_date, locate(\"-\",attandance_date)+1, 2) =
        // (:month);", nativeQuery = true)
        // List<Attandance> findAttList(@Param("month")String month);

        // 현재 사용X
        @Query(value = "select mem_name, attandance_status from attandance where attandance_date = (:curruentDate)", nativeQuery = true)
        List<Attandance> findAttList2(@Param("curruentDate") String curruentDate);

        // @Query(value = "select * from attandance where attandance_date =
        // substring(DATE(NOW()), 1, 10)", nativeQuery = true)
        // @Query(value = "select * from attandance where attandance_date =
        // DATE_FORMAT(NOW(), '%Y-%m-%d')", nativeQuery = true)

        // 현재 사용O
        // 문제 : 달별로 출석 데이터 출력
        // 4/24일 select * 로 전체 데이터 가져오는 쿼리에서 특정 컬럼만 가져오는 데이터로 변경
        // @Query(value = "select * from attandance where substring(attandance_date, 1,7) = (:attandance_date)", nativeQuery = true)
        @Query(value = "select mem_serial, attandance_date, mem_name, attandance_status "+
        "from attandance where substring(attandance_date, 1,7) = (:attandance_date)", nativeQuery = true)
        List<Attandance> findAttList3(@Param("attandance_date") String
        attandance_date);

        // 출,결석 일자 포함하여 리스트 출력 : front에서 reduce 써주면 되는거라 일단꺼놓기..ㅠ.ㅠ
        // @Query("select new com.child.project.domain.AttandanceDTO"+
        // "(A.memSerial, A.attDate, A.memName, A.attStatus,"+
        // "(select count(*) from Attandance as B where B.memSerial = A.memSerial and substring(attDate, 1, 7)  = :attandanceDate and attStatus = '출') as attcount ,"+
        // "(select count(*) from Attandance as B where B.memSerial = A.memSerial and substring(attDate, 1, 7)  = :attandanceDate and attStatus = '결') as abscount )"+
        // "from Attandance as A where substring(attDate, 1, 7) = :attandanceDate")
        // List<AttandanceDTO> findAttList3(@Param("attandanceDate") String attandance_date);


        // 멤버에서 처리!!!!!!!!!!!!! => 왜냐면 이름이랑 시리얼번호만 중복없이 받으믄대니까!!
        // 리스트에서 중복된 시리얼 값을 제외하고 가져오기 : 퇴소한애들은 안져와야되니까 member에서 갖고오기
        // with 절 사용 시 다른 테이블명으로 생성되므로 기존 엔티티와 매칭되지 않음
        // @Query(value = "with unique_serials AS (select distinct mem_serial from
        // attandance) select mem_serial from unique_serials ", nativeQuery = true)
        @Query(value = "select mem_serial, mem_name"+
        " from member where mem_status='이용' ", nativeQuery = true)
        List<Attandance> findAdmissionList();

        // 관리자 페이지 내 출,결석 처리 : 체크 후 버튼 클릭 시 '결' 입력
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

        // @Query(value = "insert into attandance value(:mem_serial, :attandance_date,
        // :mem_name, :attandance_status)"
        // +"where ", nativeQuery = true)

        // 출석일자 카운팅하기 : 리스트 뽑아올 때 추가 컬럼으로 가져오기
        // @Query(value = "select count(*) from attandance where attandance_status='출'
        // and month(attandance_date)=month(current_date()) and
        // year(attandance_date)=year(current_date()) group by :mem_serial", nativeQuery
        // = true)
        // Integer attcount(@Param("mem_serial") String mem_serial);

}
