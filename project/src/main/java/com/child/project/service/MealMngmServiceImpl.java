package com.child.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.child.project.domain.MealDTO;
import com.child.project.entity.MealMngm;
import com.child.project.entity.MealMngmId;
import com.child.project.repository.MealMngmRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Log4j2
@Service
public class MealMngmServiceImpl implements MealMngmService {

    private final MealMngmRepository mealRepository;

    @Override
    public List<MealMngm> selectList() {

        return mealRepository.findAll();
    }

    @Override
    public List<MealMngm> selectListYM(String yearMonth) {

        return mealRepository.selectListYM(yearMonth);
    }

    @Override
    public MealMngm mealInsert(MealMngm entity) {

        // return mealRepository.save(memSerial , mealDate , memName ,staffNm, brfMeal);
        if (entity != null) {

            return mealRepository.save(entity);

        } else {
            return null;
        }
    }

    @Override
    public MealMngm selectOne(MealMngmId entityId) {

        Optional<MealMngm> result = mealRepository.findById(entityId);

        if (result.isPresent())

            return result.get(); // ver01
        else
            return null;
    }

    @Override
    public MealMngm mnInsert(MealMngm entity) {

        return mealRepository.save(entity);
    }

    @Override
    public MealDTO selectChartdata(MealDTO dto) {
        log.info(" Test gkgkgkgkgkgkgkgk"+mealRepository.selectChartdata2());
        dto.setBrk_meal(mealRepository.selectChartdata1());
        dto.setLnc_meal(mealRepository.selectChartdata2());
        dto.setDnr_meal(mealRepository.selectChartdata3());
        dto.setSnk_meal(mealRepository.selectChartdata4());
        // list.add(mealRepository.selectChartdata1());
        // list.add(mealRepository.selectChartdata2());
        // list.add(mealRepository.selectChartdata3());
        // list.add(mealRepository.selectChartdata4());
        // TODO Auto-generated method stub
        return dto;
    }

}
